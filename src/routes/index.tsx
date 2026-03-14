import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "@/features/i18n/use-translation";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { t } = useTranslation();

	return (
		<section>
			<h1>{t("appName")}</h1>
			<p>{t("greetings", { name: "Mohamed", lastLoginDate: new Date() })}</p>
			<p>{t("inboxMessages", { name: "Mohamed", messages: 5 })}</p>
			<p>{t("hobby", { hobby: "developer" })}</p>
		</section>
	);
}
