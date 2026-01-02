import { Grid } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useQueryStates } from "nuqs";
import PageHeader from "@/components/page-header";
import { ProjectCard } from "@/components/portfolio-card";

const data = [
	{
		title: "Seanard",
		description: "Description",
		framework: ["NextJS"],
		libraries: ["MantineUI"],
		url: "https://seanard.vercel.app",
		repository: "https://github.com/SeanardK",
	},
	{
		title: "Seanard",
		description: "Description",
		framework: ["NextJS"],
		libraries: ["MantineUI"],
		url: "https://seanard.vercel.app",
		repository: "https://github.com/SeanardK",
	},
	{
		title: "Seanard",
		description: "Description",
		framework: ["NextJS"],
		libraries: ["MantineUI"],
		url: "https://seanard.vercel.app",
		repository: "https://github.com/SeanardK",
	},
];

function PagePortfolioIndex() {
	const navigate = useNavigate();

	const handleAddProject = () => navigate({ to: "/portfolio/add" });

	return (
		<div>
			<PageHeader title="Portfolio" onAddClick={handleAddProject} />

			<Grid>
				{data.map((item) => (
					<Grid.Col
						span={{
							xs: 12,
							md: 3,
						}}
						key={item.title}
					>
						<ProjectCard
							title={item.title}
							description={item.description}
							framework={item.framework}
							libraries={item.libraries}
							onClickDetail={() => {}}
							detail=""
							repository={item.repository}
							url={item.url}
						/>
					</Grid.Col>
				))}
			</Grid>
		</div>
	);
}

export default PagePortfolioIndex;
