import { Affix, AppShell, Button, Flex, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MenuIcon } from "lucide-react";
import Navbar from "@/components/navbar";
import usePrivateRoute from "@/helper/usePrivateRoute";

export const Route = createFileRoute("/_dashboardLayout")({
	component: RouteComponent,
});

function RouteComponent() {
	usePrivateRoute();

	const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure(false);

	return (
		<AppShell
			padding="md"
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !navbarOpened },
			}}
		>
			<AppShell.Navbar>
				<Navbar />
			</AppShell.Navbar>

			<Affix
				display={{ base: "block", md: "none" }}
				position={{ bottom: 20, left: 20 }}
			>
				<Button variant="filled" onClick={toggleNavbar}>
					<MenuIcon />
				</Button>
			</Affix>

			<AppShell.Main className="pt-0!">
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
