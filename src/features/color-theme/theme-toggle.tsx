import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
import { useTheme } from "@/features/color-theme/theme-provider";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<Button aria-label="Toggle theme" onClick={toggleTheme} variant="ghost">
			<Swap
				animation="rotate"
				onSwappedChange={(val) => setTheme(val ? "dark" : "light")}
				swapped={theme === "dark"}
			>
				<SwapOn>
					<Moon />
				</SwapOn>
				<SwapOff>
					<Sun />
				</SwapOff>
			</Swap>
		</Button>
	);
}
