import instance from "@/lib/axios";

const portfolioService = {
	getAll: async () => await instance.get("/portfolio"),

	getById: async (id: string) => await instance.get(`/portfolio/${id}`),

	create: async (data: FormData) =>
		await instance.post("/portfolio", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),

	update: async (id: string, data: FormData) =>
		await instance.patch(`/portfolio/${id}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}),

	delete: async (id: string) => await instance.delete(`/portfolio/${id}`),
};

export default portfolioService;
