import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { todos } from "@/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "./init";

const todosRouter = {
	list: publicProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.todos.findMany();
	}),
	add: protectedProcedure
		.input(z.object({ name: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const newTodo = await ctx.db
				.insert(todos)
				.values({
					title: input.name,
				})
				.returning();
			return newTodo;
		}),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
	todos: todosRouter,
});
export type TRPCRouter = typeof trpcRouter;
