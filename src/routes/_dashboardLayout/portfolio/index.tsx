import { createFileRoute } from "@tanstack/react-router";
import PagePortfolioIndex from "@/pages/portfolio";
import portfolioService from "@/services/portfolio";

export const Route = createFileRoute("/_dashboardLayout/portfolio/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Portfolio",
			},
		],
	}),
	loader: async () => {
		try {
			const result = await portfolioService.getAll();

			return { portfolios: result?.data };
		} catch (error) {
			console.error("Failed to load portfolios:", error);
			return { portfolios: [] };
		}
	},
});

function RouteComponent() {
	const { portfolios } = Route.useLoaderData();

	return <PagePortfolioIndex initialData={portfolios || []} />;
}
