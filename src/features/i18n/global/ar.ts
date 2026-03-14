import { dt, type LanguageMessages } from "../lib";

export default {
	locale: "ar",
	opposite: "English",
	greetings: "مرحبًا {name}! آخر تسجيل دخول لك كان في {lastLoginDate:date}.",
	inboxMessages: dt("مرحبًا {name}، لديك {messages:plural}.", {
		plural: { messages: { one: "رسالة واحدة", other: "{?} رسائل" } },
	}),
	hobby: dt("اخترت {hobby:enum} كهوايتك.", {
		enum: { hobby: { runner: "عداء", developer: "مطور" } },
	}),
	appName: "مثال جاتيلينج",
	error: "حدث خطأ {error}. يرجى المحاولة مرة أخرى لاحقًا.",
} as const satisfies LanguageMessages;
