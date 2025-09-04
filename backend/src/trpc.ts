import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { UserRouter } from "./routers/userRouter";

const t = initTRPC.create();

export const appRouter = t.router({

    hello: t.procedure
        .input(z.object({ boi: z.string().optional() }))
        .query(({ input }) => {
            return { msg: `marvel` };
        }),


    add: t.procedure
        .input(z.object({ a: z.number(), b: z.number() }))
        .mutation(({ input }) => {
            return input.a + input.b;
        }),


    user: UserRouter,
});
console.log("Router procedures:", Object.keys(appRouter._def.procedures));
// Export type definition of API
export type AppRouter = typeof appRouter;
