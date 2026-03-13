import { Button, Divider, Flex, Modal, Text } from "@mantine/core";
import { AlertTriangle } from "lucide-react";

type ModalDeleteProps = {
	opened: boolean;

	onClose: () => void;
	onConfirm: () => void;
};

function ModalDelete({ onClose, onConfirm, opened }: ModalDeleteProps) {
	return (
		<Modal centered opened={opened} onClose={onClose} withCloseButton={false}>
			<Flex
				py={"lg"}
				px={"md"}
				direction="column"
				align="center"
				justify="center"
			>
				<AlertTriangle size={50} color="red" />
				<Text pb="sm" size="xl">
					Are you sure you want to delete this item?
				</Text>
			</Flex>

			<Divider py={"xs"} />

			<Flex gap="sm" justify="flex-end" align="center">
				<Button onClick={onClose}>Cancel</Button>
				<Button color="red" onClick={onConfirm}>
					Delete
				</Button>
			</Flex>
		</Modal>
	);
}

export default ModalDelete;
