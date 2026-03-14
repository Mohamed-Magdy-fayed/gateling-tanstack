import type { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";
import type { Theme } from "@/features/color-theme/theme";
import { ThemeProvider } from "@/features/color-theme/theme-provider";
import { TranslationProvider } from "@/features/i18n/use-translation";
import TanStackQueryProvider from "@/integrations/tanstack-query/root-provider";

type Props = PropsWithChildren<{ theme: Theme; locale: string }>;

export function Providers({ children, theme, locale }: Props) {
	return (
		<TanStackQueryProvider>
			<ThemeProvider theme={theme}>
				<TranslationProvider defaultLocale={locale}>
					{children}
					<Toaster />
				</TranslationProvider>
			</ThemeProvider>
		</TanStackQueryProvider>
	);
}
