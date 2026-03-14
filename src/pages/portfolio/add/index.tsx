import { Button, Flex, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import z from "zod";
import PageHeader from "@/components/page-header";
import RenderFormField from "@/components/render-form-field";
import { usePortfolioCreateMutation } from "@/query/portfolio";

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

function PagePortfolioAdd() {
	const navigate = useNavigate();
	const createMutation = usePortfolioCreateMutation();

	const [redirect, setRedirect] = useState(true);

	const validation = z.object({
		title: z.string().min(2),
		description: z.string().min(5),
		detail: z.string().optional(),
		image: z.instanceof(File),
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

		createMutation.mutate(formData, {
			onSuccess: () => {
				notifications.show({
					title: "Success",
					message: "Portfolio created successfully",
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
					message: error.message || "Failed to create portfolio",
					color: "red",
				});
			},
		});
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<PageHeader
				title="Add Portfolio"
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
						<Button type="submit" loading={createMutation.isPending}>
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

export default PagePortfolioAdd;
