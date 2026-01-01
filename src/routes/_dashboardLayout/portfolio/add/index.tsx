import { createFileRoute } from "@tanstack/react-router";
import PagePortfolioAdd from "@/pages/portfolio/add";

export const Route = createFileRoute("/_dashboardLayout/portfolio/add/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Portfolio Add",
			},
		],
	}),
});

function RouteComponent() {
	return <PagePortfolioAdd />;
}
