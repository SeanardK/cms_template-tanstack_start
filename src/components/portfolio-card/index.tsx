import {
	ActionIcon,
	AspectRatio,
	Badge,
	Button,
	Card,
	Divider,
	Group,
	Image,
	Modal,
	ScrollArea,
	Text,
	Title,
} from "@mantine/core";
import htmlParser from "html-react-parser";
import { useCallback, useState } from "react";
import classes from "./style.module.css";

type ProjectCardProps = {
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
	title,
	description,
	detail,
	framework,
	libraries,
	repository,
	url,
	image = `/example-ukelele-tanstack.jpg`,
}: ProjectCardProps) {
	const [showDetail, setShowDetail] = useState(false);

	const handleClickDetail = () => {
		setShowDetail(true);
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
						<Image src={image} alt={title} />
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
					<Button fullWidth onClick={handleClickDetail}>
						See Details
					</Button>
				</Card.Section>
			</Card>

			<Modal
				centered
				withCloseButton={false}
				size={"xl"}
				opened={showDetail}
				onClose={() => setShowDetail(false)}
			>
				<div className="relative h-full">
					<AspectRatio ratio={16 / 9}>
						<Image radius={"md"} src={image} alt={title} />
					</AspectRatio>

					<Group className="py-4">
						<Title size={24} className="mb-2">
							{title}
						</Title>
						<Text>{htmlParser(detail || "")}</Text>
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
				</div>
			</Modal>
		</>
	);
}
