import { Accordion, Box, Button, Flex, Menu, ScrollArea } from "@mantine/core";
import { useKeycloak } from "@react-keycloak/web";
import { Link } from "@tanstack/react-router";

function Navbar() {
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
				<Menu>
					<ScrollArea h={"85vh"}>
						<Accordion>
							{/* Demo Pages */}
							<Accordion.Item key={"demo"} value={"demo"}>
								<Accordion.Control>Demo</Accordion.Control>

								<Accordion.Panel>
									<Link to="/">
										<Menu.Item>Home</Menu.Item>
									</Link>
									<Link to="/tutorial/demo/start/server-funcs">
										<Menu.Item>/demo/start/server-funcs</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/start/api-request">
										<Menu.Item>/demo/start/api-request</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/start/ssr">
										<Menu.Item>/demo/start/ssr</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/start/ssr/spa-mode">
										<Menu.Item>/demo/start/ssr/spa-mode</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/start/ssr/full-ssr">
										<Menu.Item>/demo/start/ssr/full-ssr</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/start/ssr/data-only">
										<Menu.Item>/demo/start/ssr/data-only</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/tanstack-query">
										<Menu.Item>/demo/tanstack-query</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/store">
										<Menu.Item>/demo/store</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/form/simple">
										<Menu.Item>/demo/form/simple</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/form/address">
										<Menu.Item>/demo/form/address</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/table">
										<Menu.Item>/demo/table</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/storybook">
										<Menu.Item>/demo/storybook</Menu.Item>
									</Link>

									<Link to="/tutorial/demo/tanchat">
										<Menu.Item>/demo/tanchat</Menu.Item>
									</Link>

									<Link to="/tutorial/example/guitars">
										<Menu.Item>/example/guitars</Menu.Item>
									</Link>
								</Accordion.Panel>
							</Accordion.Item>

							{/* CRUD Pages */}
							<Accordion.Item key={"management"} value={"management"}>
								<Accordion.Control>Management</Accordion.Control>

								<Accordion.Panel>
									<Link to="/portfolio">
										<Menu.Item>Portfolio</Menu.Item>
									</Link>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</ScrollArea>
				</Menu>
			</Box>

			<Button
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
