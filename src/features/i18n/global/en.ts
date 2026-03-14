import { dt, type LanguageMessages } from "../lib";

export default {
	locale: "en",
	opposite: "عربي",
	greetings: "Hello {name}! Your last login was {lastLoginDate:date}.",
	inboxMessages: dt("Hello {name}, you have {messages:plural}.", {
		plural: { messages: { one: "1 message", other: "{?} messages" } },
	}),
	hobby: dt("You chose {hobby:enum} as your hobby.", {
		enum: { hobby: { runner: "runner", developer: "developer" } },
	}),
	appName: "Gateling Example",
} as const satisfies LanguageMessages;
