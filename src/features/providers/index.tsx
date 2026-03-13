import type { PropsWithChildren } from "react";
import type { Theme } from "@/features/color-theme/theme";
import { ThemeProvider } from "@/features/color-theme/theme-provider";
import TanStackQueryProvider from "@/integrations/tanstack-query/root-provider";

type Props = PropsWithChildren<{ theme: Theme }>;

export function Providers({ children, theme }: Props) {
	return (
		<TanStackQueryProvider>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</TanStackQueryProvider>
	);
}
