import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/features/color-theme/theme-provider";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<Button aria-label="Toggle theme" onClick={toggleTheme} variant="ghost">
			{theme === "dark" ? <Moon /> : <Sun />}
		</Button>
	);
}
