import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { NuqsAdapter } from "nuqs/adapters/tanstack-router";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../styles.css?url";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";

import type { QueryClient } from "@tanstack/react-query";
import keycloak from "@/config/keycloack";
import NotFoundComponent from "@/pages/NotFound";
import { theme } from "@/theme";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	shellComponent: RootDocument,
	notFoundComponent: () => <NotFoundComponent />,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<ColorSchemeScript />
			</head>
			<body>
				<ReactKeycloakProvider authClient={keycloak}>
					<MantineProvider theme={theme}>
						<Notifications position="bottom-right" />

						<NuqsAdapter>{children}</NuqsAdapter>

						<TanStackDevtools
							config={{
								position: "bottom-right",
							}}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
								TanStackQueryDevtools,
							]}
						/>
					</MantineProvider>
				</ReactKeycloakProvider>
				<Scripts />
			</body>
		</html>
	);
}
