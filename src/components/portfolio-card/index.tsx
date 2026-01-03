import {
	ActionIcon,
	AspectRatio,
	Badge,
	Button,
	Card,
	Divider,
	Flex,
	Group,
	Image,
	Modal,
	ScrollArea,
	Text,
	Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Link } from "@tanstack/react-router";
import htmlParser from "html-react-parser";
import { Edit2, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { PORTFOLIO_IMAGES_BASE_URL } from "@/constants";
import { usePortfolioDeleteMutation } from "@/query/portfolio";
import ModalDelete from "../modal-delete";
import classes from "./style.module.css";

type ProjectCardProps = {
	id: string;
	title: string;
	description: string;
	detail: string;
	framework: string[];
	libraries: string[];
	repository?: string;
	url?: string;
	image?: string;

	onClickDetail: () => void;
};

export function ProjectCard({
	id,
	title,
	description,
	detail,
	framework,
	libraries,
	repository,
	url,
	image,
}: ProjectCardProps) {
	const deleteMutation = usePortfolioDeleteMutation();

	const imageSrc = useMemo(() => {
		return image
			? PORTFOLIO_IMAGES_BASE_URL + image
			: `/example-ukelele-tanstack.jpg`;
	}, [image]);

	const [showDetail, setShowDetail] = useState(false);
	const [showModalDelete, setShowModalDelete] = useState(false);

	const handleClickDetail = () => {
		setShowDetail(true);
	};

	const handleDelete = () => {
		deleteMutation.mutate(id, {
			onSuccess: () => {
				notifications.show({
					title: "Success",
					message: "Portfolio created successfully",
					color: "green",
				});
			},
			onError: (error) => {
				notifications.show({
					title: "Error",
					message: error.message || "Failed to create portfolio",
					color: "red",
				});
			},
		});
	};

	const TechStack = useCallback(
		() => (
			<ScrollArea mah={24}>
				{framework.map((item) => (
					<Badge className="mr-1" variant="light" key={item}>
						{item}
					</Badge>
				))}

				{libraries.map((item) => (
					<Badge className="mr-1" variant="light" key={item}>
						{item}
					</Badge>
				))}
			</ScrollArea>
		),
		[framework, libraries],
	);

	return (
		<>
			<Card withBorder radius="md" p="md" className={classes.card}>
				<Card.Section>
					<AspectRatio ratio={16 / 9}>
						<Image src={imageSrc} alt={title} />
					</AspectRatio>
				</Card.Section>

				<Card.Section className={`${classes.section} flex-1`} mt="md">
					<Group justify="apart">
						<Text truncate fz="lg" fw={500}>
							{title}
						</Text>
					</Group>

					<Text lineClamp={3} fz="sm" mt="xs">
						{description}
					</Text>
				</Card.Section>

				<Card.Section className={classes.section}>
					<Text mt="md" className={classes.label} c="dimmed">
						Technology :
					</Text>
					<Group gap={7} mt={5}>
						<TechStack />
					</Group>
				</Card.Section>

				<Card.Section className={`p-2`}>
					<Flex gap={"xs"} direction={"column"}>
						<Button fullWidth onClick={handleClickDetail}>
							See Details
						</Button>

						<Flex gap={"xs"}>
							<Button
								className="w-full"
								leftSection={<Trash2 size={15} />}
								color="red"
								fullWidth
								onClick={() => setShowModalDelete(true)}
							>
								Delete
							</Button>

							<Link
								className="w-full"
								to={`/portfolio/edit/$id`}
								params={{ id }}
							>
								<Button
									fullWidth
									leftSection={<Edit2 size={15} />}
									color="blue"
								>
									Edit
								</Button>
							</Link>
						</Flex>
					</Flex>
				</Card.Section>
			</Card>

			<Modal
				centered
				withCloseButton={false}
				size={"xl"}
				opened={showDetail}
				onClose={() => setShowDetail(false)}
			>
				<AspectRatio ratio={16 / 9}>
					<Image radius={"md"} src={imageSrc} alt={title} />
				</AspectRatio>

				<Group className="py-4 flex-col! items-start!">
					<Title size={24} className="mb-2">
						{title}
					</Title>
					<Text component="p">{htmlParser(detail || "")}</Text>
				</Group>

				<Divider />

				<div className="my-4">
					<div>
						<Text c="dimmed">Technology I Use :</Text>
					</div>

					<Group gap={7} mt={5}>
						{framework?.map((item) => (
							<Badge className="mr-1" variant="light" key={item}>
								{item}
							</Badge>
						))}

						{libraries?.map((item) => (
							<Badge className="mr-1" variant="light" key={item}>
								{item}
							</Badge>
						))}
					</Group>
				</div>

				<Divider />

				<Group className="pt-4" gap={"xs"}>
					{repository && (
						<Button
							component="a"
							href={repository}
							variant="light"
							flex={1}
							fullWidth
						>
							See Repository
						</Button>
					)}
					{url && (
						<Button
							component="a"
							href={url}
							variant="filled"
							flex={1}
							fullWidth
						>
							See Project
						</Button>
					)}
				</Group>
			</Modal>

			<ModalDelete
				opened={showModalDelete}
				onClose={() => setShowModalDelete(false)}
				onConfirm={handleDelete}
			/>
		</>
	);
}
