import { initTRPC } from "@trpc/server";
import { z } from "zod";

import { UserRouter } from "./routers/userRouter";

import { EventEmitter } from "stream";

const t = initTRPC.create();


const emitter=new EventEmitter();

export const appRouter = t.router({

    hello: t.procedure
        .input(z.object({ boi: z.string().optional() }))
        .query(({ input }) => {

emitter.emit("update","Hello from tRPC server !!");

            return { msg: `marvel` };
        }),


    add: t.procedure
        .input(z.object({ a: z.number(), b: z.number() }))
        .mutation(({ input }) => {

            emitter.emit("update",`Adding ${input.a} and ${input.b}`);
            return input.a + input.b;
        }),

    user: UserRouter,

     clock: t.procedure
    .input(z.object({ interval: z.number().min(100) }))
    .subscription( async function* (opts) {
     

        while (!opts.signal?.aborted) {
          await new Promise((r) => setTimeout(r, opts.input.interval));
          yield new Date().toISOString();
        }
      }
    ),
});
console.log("Router procedures:", Object.keys(appRouter._def.procedures));
// Export type definition of API
export type AppRouter = typeof appRouter;
