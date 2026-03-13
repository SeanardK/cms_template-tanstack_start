import { Grid } from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
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
		</div>
	);
}

export default PagePortfolioIndex;
