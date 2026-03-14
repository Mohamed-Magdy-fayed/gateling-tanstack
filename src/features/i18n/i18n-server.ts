import { mainTranslations } from "@/features/i18n/global";
import { getLocaleCookie } from "@/features/i18n/i18n-cookies";
import { createI18n } from "@/features/i18n/lib";

export async function getT() {
	const locale = await getLocaleCookie();
	const { t } = createI18n(mainTranslations, locale, "en");

	return { t, locale };
}
