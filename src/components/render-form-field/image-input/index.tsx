import { Button, FileInput, Flex, Modal } from "@mantine/core";
import { Eye, Image } from "lucide-react";
import { useState } from "react";

type ImageInputProps = {
	onChange: (file: File | null) => void;
	form?: any;
};

function ImageInput({ onChange, form }: ImageInputProps) {
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
				leftSection={<Image />}
				accept="image/*"
				{...form}
				onChange={handleFileChange}
			/>

			{preview && (
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
				{preview && (
					<img
						src={preview}
						alt="Preview"
						className="max-h-[70vh] w-full h-full object-contain"
					/>
				)}
			</Modal>
		</Flex>
	);
}

export default ImageInput;
