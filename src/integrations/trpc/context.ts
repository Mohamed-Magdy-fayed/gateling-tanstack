import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { db } from "@/db";

export type TRPCUser = {
	id: string;
};

function getUserFromRequest(req: Request): TRPCUser | null {
	return Math.random() > 0.5 ? { id: "user-id" } : null;
}

export async function createTRPCContext(opts: FetchCreateContextFnOptions) {
	return {
		db,
		req: opts.req,
		user: getUserFromRequest(opts.req),
	};
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
