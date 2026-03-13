import { FileInput, InputWrapper, Textarea, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { File } from "lucide-react";
import ImageInput from "./image-input";
import RichEditor from "./rich-editor";

type RenderFormFieldProps = {
	field: any;
	form: UseFormReturnType<any>;
	aspectRatio?: number;
};

function RenderFormField({ field, form, aspectRatio }: RenderFormFieldProps) {
	return (
		<InputWrapper key={field.name} label={field.label} mb={4}>
			{(field.type === "text" || !field.type) && (
				<TextInput
					placeholder={field.placeholder}
					{...form.getInputProps(field.name)}
				/>
			)}

			{field.type === "textarea" && (
				<Textarea
					placeholder={field.placeholder}
					resize="vertical"
					{...form.getInputProps(field.name)}
				/>
			)}

			{field.type === "rich-editor" && (
				<RichEditor form={form.getInputProps(field.name)} />
			)}

			{field.type === "file" && (
				<FileInput
					leftSection={<File />}
					placeholder={field.placeholder}
					{...form.getInputProps(field.name)}
				/>
			)}

			{field.type === "image" && (
				<ImageInput
					form={form.getInputProps(field.name)}
					onChange={(file) => {
						form.setFieldValue(field.name, file);
					}}
					aspectRatio={aspectRatio}
				/>
			)}
		</InputWrapper>
	);
}

export default RenderFormField;
