import { Button } from "@/components/ui/button";
import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { useTranslation } from "@/features/i18n/use-translation";

export function LanguageSwitcher() {
	const { setLocale, locale } = useTranslation();

	return (
		<Button asChild variant="ghost">
			<Swap
				animation="flip"
				onSwappedChange={(val) => setLocale(val ? "en" : "ar")}
				swapped={locale === "en"}
			>
				<SwapOn>AR</SwapOn>
				<SwapOff>EN</SwapOff>
			</Swap>
		</Button>
	);
}
