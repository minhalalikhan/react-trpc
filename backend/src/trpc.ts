import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
    hello: t.procedure
        .input(z.object({ name: z.string().optional() }))
        .query(({ input }) => {
            return { greeting: `Hello ${input?.name ?? "world"}` };
        }),

    add: t.procedure
        .input(z.object({ a: z.number(), b: z.number() }))
        .mutation(({ input }) => {
            return input.a + input.b;
        }),
});

// Export type definition of API
export type AppRouter = typeof appRouter;
