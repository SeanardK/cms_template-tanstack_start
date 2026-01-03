import {
	AspectRatio,
	Button,
	FileInput,
	Flex,
	Image,
	Modal,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { Eye, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_IMAGES_BASE_URL } from "@/constants";

type ImageInputProps = {
	onChange: (file: File | null) => void;
	form: ReturnType<UseFormReturnType<any>["getInputProps"]>;
	aspectRatio?: number;
};

function ImageInput({ onChange, form, aspectRatio }: ImageInputProps) {
	const [preview, setPreview] = useState<string | null>(null);
	const [showPreview, setShowPreview] = useState(false);

	const handleFileChange = (file: File | null) => {
		onChange(file);
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result as string);
			reader.readAsDataURL(file);
		} else {
			setPreview(null);
		}
	};

	return (
		<Flex gap={"sm"}>
			<FileInput
				className="flex-1"
				leftSection={<ImageIcon />}
				accept="image/*"
				{...form}
				onChange={handleFileChange}
				placeholder={form.defaultValue || "Upload an image"}
			/>

			{(preview || form.defaultValue) && (
				<Button onClick={() => setShowPreview(true)}>
					<Eye />
				</Button>
			)}

			<Modal
				centered
				size={"lg"}
				opened={showPreview}
				onClose={() => setShowPreview(false)}
				title="Image Preview"
			>
				{(preview || form.defaultValue) && (
					<AspectRatio ratio={aspectRatio || 16 / 9}>
						<Image
							src={preview || PORTFOLIO_IMAGES_BASE_URL + form.defaultValue}
							alt="Preview"
							className="max-h-[70vh] w-full h-full object-contain"
						/>
					</AspectRatio>
				)}
			</Modal>
		</Flex>
	);
}

export default ImageInput;
