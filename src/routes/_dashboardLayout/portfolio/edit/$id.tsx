import { createFileRoute } from "@tanstack/react-router";
import PagePortfolioEdit from "@/pages/portfolio/edit";
import portfolioService from "@/services/portfolio";

export const Route = createFileRoute("/_dashboardLayout/portfolio/edit/$id")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Portfolio Edit",
			},
		],
	}),
	loader: async ({ params }) => {
		const response = await portfolioService.getById(params.id);
		return { portfolio: response.data };
	},
});

function RouteComponent() {
	const { portfolio } = Route.useLoaderData();

	return <PagePortfolioEdit initialData={portfolio} />;
}
