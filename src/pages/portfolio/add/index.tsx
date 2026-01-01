import { Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import z from "zod";
import PageHeader from "@/components/page-header";
import RenderFormField from "@/components/render-form-field";

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
	const validation = z.object({
		title: z.string().min(2),
		description: z.string().min(5),
		detail: z.string().optional(),
		image: z.instanceof(File),
		file: z.instanceof(File),
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
		console.log(values, errors);
	};

	useEffect(() => {
		console.log(form.errors);
	}, [form.errors]);

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<PageHeader
				title="Add Portfolio"
				showAdd={false}
				showSearch={false}
				showFilter={false}
				rightSection={
					<Flex justify={"end"} align={"center"} gap={"sm"}>
						<Button type="button" variant="outline">
							Cancel
						</Button>
						<Button type="submit">Submit</Button>
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
