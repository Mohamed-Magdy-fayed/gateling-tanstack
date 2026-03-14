import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { getThemeServerFn } from "@/features/color-theme/theme";
import { getLocaleCookie } from "@/features/i18n/i18n-cookies";
import { Providers } from "@/features/providers";
import type { TRPCRouter } from "@/integrations/trpc/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
	trpc: TRPCOptionsProxy<TRPCRouter>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	loader: async () => ({
		theme: await getThemeServerFn(),
		locale: await getLocaleCookie(),
	}),
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
	shellComponent: RootDocument,
	notFoundComponent: () => <div>Not Found</div>,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { theme, locale } = Route.useLoaderData();

	return (
		<html
			className={theme}
			dir={locale === "ar" ? "rtl" : "ltr"}
			lang={locale}
			suppressHydrationWarning
		>
			<head>
				<HeadContent />
			</head>
			<body
				className={`wrap-anywhere flex min-h-screen flex-col font-sans antialiased`}
			>
				<Providers locale={locale} theme={theme}>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
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
				</Providers>
				<Scripts />
			</body>
		</html>
	);
}
