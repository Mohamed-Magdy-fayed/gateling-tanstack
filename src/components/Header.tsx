import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "@/features/color-theme/theme-toggle";

export default function Header() {
	return (
		<header>
			<nav>
				<Link to="/">Gateling Solutions</Link>
				<ThemeToggle />
			</nav>
		</header>
	);
}
