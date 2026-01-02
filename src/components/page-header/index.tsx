import { Button, Flex, Input, Title } from "@mantine/core";
import _ from "lodash";
import { ListFilter, Plus, Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback, useState } from "react";

type PageHeaderProps = {
	title: string;

	showFilter?: boolean;
	showSearch?: boolean;
	showAdd?: boolean;

	rightSection?: React.ReactNode;

	onAddClick?: () => void;
};

function PageHeader({
	title,

	showFilter = true,
	showSearch = true,
	showAdd = true,

	rightSection,

	onAddClick,
}: PageHeaderProps) {
	const [querySearch, setQuerySearch] = useQueryState("search", {
		defaultValue: "",
	});
	const [search, setSearch] = useState(querySearch);

	const handleChangeSearch = useCallback(
		_.debounce((value: string) => {
			setQuerySearch(value);
		}, 300),
		[],
	);

	return (
		<Flex
			direction={{ base: "column", md: "row" }}
			justify={"space-between"}
			align={"center"}
			className="sticky top-0 py-4 pb-1 border-b z-10 mb-4 bg-(--mantine-color-body)"
		>
			<Title order={1} className="text-2xl font-bold">
				{title}
			</Title>

			<Flex
				direction={{ base: "column", md: "row" }}
				gap={"sm"}
				justify={"flex-end"}
				align={"center"}
			>
				{showSearch && (
					<Input
						value={search}
						leftSection={<Search />}
						placeholder="Search..."
						onChange={(e) => {
							setSearch(e.target.value);
							handleChangeSearch(e.target.value);
						}}
					/>
				)}
				<Flex gap={"sm"}>
					{showFilter && <Button leftSection={<ListFilter />}>Filter</Button>}

					{showAdd && (
						<Button leftSection={<Plus />} onClick={onAddClick}>
							Add {title}
						</Button>
					)}

					{rightSection}
				</Flex>
			</Flex>
		</Flex>
	);
}

export default PageHeader;
