import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import portfolioService from "@/services/portfolio";

export const usePortfolioGetAllQuery = (initialData?: any) =>
	useQuery({
		queryKey: ["portfolio", "getAll"],
		queryFn: () => portfolioService.getAll(),
		initialData,
	});

export const usePortfolioGetByIdQuery = (id: string, initialData?: any) =>
	useQuery({
		queryKey: ["portfolio", "getById", id],
		queryFn: () => portfolioService.getById(id),
		initialData,
	});

export const usePortfolioCreateMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: FormData) => portfolioService.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["portfolio", "getAll"] });
		},
	});
};

export const usePortfolioUpdateMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: FormData }) =>
			portfolioService.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["portfolio", "getAll"] });
		},
	});
};

export const usePortfolioDeleteMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => portfolioService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["portfolio", "getAll"] });
		},
	});
};
