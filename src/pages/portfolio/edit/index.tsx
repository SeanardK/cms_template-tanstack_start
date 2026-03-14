import { Button, Flex, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect, useState } from "react";
import z from "zod";
import PageHeader from "@/components/page-header";
import RenderFormField from "@/components/render-form-field";
import {
	usePortfolioGetByIdQuery,
	usePortfolioUpdateMutation,
} from "@/query/portfolio";

const inputFields = [
	{
		name: "title",
		label: "Title",
		placeholder: "Enter Portfolio Title",
		defaultValue: "",
	},
	{
		name: "image",
		label: "Image",
		placeholder: "Image URL",
		defaultValue: "",
		type: "image",
	},
	{
		name: "description",
		label: "Short Description",
		placeholder: "Enter Description",
		defaultValue: "",
		type: "textarea",
	},
	{
		name: "detail",
		label: "Detail",
		placeholder: "Enter Details",
		defaultValue: "",
		type: "rich-editor",
	},
	{
		name: "framework",
		label: "Framework",
		placeholder: "Enter Framework",
		defaultValue: "",
	},
	{
		name: "libraries",
		label: "Libraries",
		placeholder: "Enter Libraries (comma separated)",
		defaultValue: "",
	},
	{
		name: "repository",
		label: "Repository",
		placeholder: "Repository URL",
		defaultValue: "",
	},
	{
		name: "url",
		label: "Live URL",
		placeholder: "Live URL",
		defaultValue: "",
		type: "text",
	},
];

function PagePortfolioEdit({ initialData }: { initialData?: any }) {
	const params = useParams({ from: "/_dashboardLayout/portfolio/edit/$id" });

	const navigate = useNavigate();
	const updateMutation = usePortfolioUpdateMutation();
	const { data: response } = usePortfolioGetByIdQuery(params.id, initialData);
	const portfolioData = response?.data || null;

	const [redirect, setRedirect] = useState(true);

	const validation = z.object({
		title: z.string().min(2),
		description: z.string().min(5),
		detail: z.string().optional(),
	});

	const initialValues = inputFields.reduce(
		(acc, f) => ({ ...acc, [f.name]: f.defaultValue }),
		{},
	);

	const form = useForm({
		mode: "uncontrolled",
		initialValues,
		validate: zod4Resolver(validation),
	});

	const handleSubmit = (values) => {
		const formData = new FormData();

		Object.keys(values).forEach((key) => {
			const value = values[key];
			if (value !== undefined && value !== null && value !== "") {
				formData.append(key, value);
			}
		});

		updateMutation.mutate(
			{ id: params.id, data: formData },
			{
				onSuccess: () => {
					notifications.show({
						title: "Success",
						message: "Portfolio updated successfully",
						color: "green",
					});
					form.reset();

					if (redirect) {
						navigate({ to: "/portfolio" });
					}
				},
				onError: (error) => {
					notifications.show({
						title: "Error",
						message: error.message || "Failed to update portfolio",
						color: "red",
					});
				},
			},
		);
	};

	useEffect(() => {
		if (portfolioData) {
			form.setValues({
				title: portfolioData.title || "",
				description: portfolioData.description || "",
				detail: portfolioData.detail || "",
				framework: portfolioData.framework || "",
				libraries: portfolioData.libraries || "",
				repository: portfolioData.repository || "",
				url: portfolioData.url || "",
				image: portfolioData.image || "",
			});
		}
	}, [portfolioData, form.setValues]);

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<PageHeader
				title="Edit Portfolio"
				showAdd={false}
				showSearch={false}
				showFilter={false}
				rightSection={
					<Flex justify={"end"} align={"center"} gap={"sm"}>
						<Switch
							label="Redirect"
							checked={redirect}
							onChange={(event) => setRedirect(event.currentTarget.checked)}
						/>
						<Button
							type="button"
							variant="outline"
							onClick={() => navigate({ to: "/portfolio" })}
						>
							Cancel
						</Button>
						<Button type="submit" loading={updateMutation.isPending}>
							Submit
						</Button>
					</Flex>
				}
			/>

			<Flex direction={"column"}>
				{inputFields.map((field) => (
					<RenderFormField key={field.name} field={field} form={form} />
				))}
			</Flex>
		</form>
	);
}

export default PagePortfolioEdit;
