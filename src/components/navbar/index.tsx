import { Accordion, Box, Button, Flex, ScrollArea } from "@mantine/core";
import { useKeycloak } from "@react-keycloak/web";
import { IconBriefcase, IconFolder } from "@tabler/icons-react";
import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

type MenuItem = {
	title: string;
	href?: string;
	icon?: ReactNode;
	subItems?: { title: string; href: string; icon?: ReactNode }[];
};

function Navbar() {
	const location = useLocation();

	const isActive = (href: string) =>
		location.pathname.split("/")[1] === href.split("/")[1];

	const menus: MenuItem[] = [
		{
			title: "Portfolio",
			href: "/portfolio",
			icon: <IconBriefcase />,
		},
	];

	const { keycloak } = useKeycloak();

	return (
		<Flex
			direction={"column"}
			justify={"space-between"}
			align={"center"}
			h={"100%"}
			p={"sm"}
		>
			<Box w={"100%"}>
				<ScrollArea h={"85vh"}>
					<Accordion multiple variant="filled">
						{menus.map((menu) =>
							menu.subItems ? (
								<Accordion.Item key={menu.title} value={menu.title}>
									<Accordion.Control icon={menu.icon}>
										{menu.title}
									</Accordion.Control>
									<Accordion.Panel>
										{menu.subItems.map((subItem) => (
											<Link to={subItem.href} key={subItem.href}>
												<Button
													key={subItem.href}
													fullWidth
													variant={isActive(subItem.href) ? "filled" : "subtle"}
													justify="flex-start"
													leftSection={subItem.icon}
												>
													{subItem.title}
												</Button>
											</Link>
										))}
									</Accordion.Panel>
								</Accordion.Item>
							) : menu.href ? (
								<Link to={menu.href} key={menu.href}>
									<Button
										key={menu.href}
										fullWidth
										variant={isActive(menu.href) ? "filled" : "subtle"}
										justify="flex-start"
										leftSection={menu.icon}
									>
										{menu.title}
									</Button>
								</Link>
							) : null,
						)}
					</Accordion>
				</ScrollArea>
			</Box>

			<Button
				color="red"
				variant="light"
				onClick={() =>
					keycloak.logout({
						redirectUri: import.meta.env.VITE_KEYCLOAK_LOGOUT_REDIRECT_URL,
					})
				}
				fullWidth
			>
				Logout
			</Button>
		</Flex>
	);
}

export default Navbar;
