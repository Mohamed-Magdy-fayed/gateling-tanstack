import { initTRPC, TRPCError } from "@trpc/server";
import { DrizzleError } from "drizzle-orm";
import superjson from "superjson";
import z from "zod";

import { getT } from "@/features/i18n/i18n-server";
import type { TRPCContext } from "./context";
import { formatZodError, mapDrizzleError } from "./error-mapping";

const t = initTRPC.context<TRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				appCode: (error as { appCode?: string }).appCode,
			},
		};
	},
});

const isAuthed = t.middleware(({ ctx, next }) => {
	const user = ctx.user;
	if (!user) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "User is not authenticated.",
		});
	}

	return next({
		ctx: {
			...ctx,
			user,
		},
	});
});

const errorWrapper = t.middleware(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		console.log(error);

		const { t } = await getT();
		if (error instanceof TRPCError) throw error;

		if (error instanceof z.ZodError) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: formatZodError(error),
			});
		}

		if (error instanceof DrizzleError) {
			const mapped = mapDrizzleError(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: mapped.message,
			});
		}

		if (error instanceof Error) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: error.message,
			});
		}

		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: t("error", { error: JSON.stringify(error) }),
		});
	}
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure.use(errorWrapper);
export const protectedProcedure = t.procedure.use(errorWrapper).use(isAuthed);
