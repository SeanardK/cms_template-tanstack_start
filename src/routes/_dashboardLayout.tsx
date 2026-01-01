import { AppShell, Button, Flex, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navbar from "@/components/navbar";

export const Route = createFileRoute("/_dashboardLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			padding="md"
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
		>
			<AppShell.Navbar>
				<Navbar toggle={toggle} />
			</AppShell.Navbar>

			<AppShell.Main className="!pt-0">
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
