import { createFileRoute } from "@tanstack/react-router";
import PagePortfolioIndex from "@/pages/portfolio";

export const Route = createFileRoute("/_dashboardLayout/portfolio/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Portfolio",
			},
		],
	}),
});

function RouteComponent() {
	return <PagePortfolioIndex />;
}
