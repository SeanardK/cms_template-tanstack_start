import { Center, Grid, Stack, Text } from "@mantine/core";
import { IconFolderOff } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import PageHeader from "@/components/page-header";
import { ProjectCard } from "@/components/portfolio-card";
import { usePortfolioGetAllQuery } from "@/query/portfolio";

function PagePortfolioIndex({ initialData }: { initialData: any[] }) {
	const {
		data: { data },
	} = usePortfolioGetAllQuery(initialData);

	const navigate = useNavigate();

	const handleAddProject = () => navigate({ to: "/portfolio/add" });

	return (
		<div>
			<PageHeader title="Portfolio" onAddClick={handleAddProject} />
			{data?.length === 0 ? (
				<Center p={"xl"}>
					<Stack align="center" gap="md">
						<IconFolderOff size={64} color="gray" stroke={1.5} />
						<Text size="lg" fw={500} c="dimmed">
							No projects yet
						</Text>
						<Text size="sm" c="dimmed">
							Click the "Add Portfolio" button to create your first project
						</Text>
					</Stack>
				</Center>
			) : (
				<Grid>
					{data?.map((item) => (
						<Grid.Col
							span={{
								xs: 12,
								md: 3,
							}}
							key={item.title}
						>
							<ProjectCard
								id={item.id}
								image={item.image}
								title={item.title}
								description={item.description}
								framework={item.framework.split(",")}
								libraries={item.libraries.split(",")}
								onClickDetail={() => {}}
								detail={item.detail}
								repository={item.repository}
								url={item.url}
							/>
						</Grid.Col>
					))}
				</Grid>
			)}
		</div>
	);
}

export default PagePortfolioIndex;
