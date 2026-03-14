import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "@/features/color-theme/theme-toggle";
import { LanguageSwitcher } from "@/features/i18n/language-switcher";

export default function Header() {
	return (
		<header>
			<nav className="flex items-center justify-between gap-4 p-4">
				<Link to="/">
					<img
						alt="Gateling Solutions Logo"
						className="size-8"
						src="G Logo.png"
					/>
				</Link>
				<ThemeToggle />
				<LanguageSwitcher />
			</nav>
		</header>
	);
}
