import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import z from "zod";

import { LOCALE_COOKIE_NAME } from "@/features/i18n/lib";

export const setLocaleCookie = createServerFn({ method: "POST" })
	.inputValidator(z.string())
	.handler(async ({ data: locale }) => {
		setCookie(LOCALE_COOKIE_NAME, locale, {
			path: "/",
			maxAge: 60 * 60 * 24 * 365, // 1 year
			sameSite: "lax",
		});
	});

export const getLocaleCookie = createServerFn().handler(async () => {
	const cookie = getCookie(LOCALE_COOKIE_NAME);
	return cookie || "en";
});
