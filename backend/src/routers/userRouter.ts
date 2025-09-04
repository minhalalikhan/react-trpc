import { initTRPC, TRPCError } from "@trpc/server";
import { UserInfo, userInfo } from "os";

import { z } from "zod";
const t = initTRPC.create();

const UserProcedure = t.procedure.input(z.object({ email: z.string() }));

const UserInfoObject = z.object({
    name: z.string(),
    age: z.number(),
    email: z.string()
})

type userInfo = z.infer<typeof UserInfoObject>;

const User: userInfo = {
    name: "minhal",
    age: 18,
    email: "minhalalikhan@gmail.com",
}

export const UserRouter = t.router({
    userInfo: UserProcedure
        .output(UserInfoObject)
        .query(({ input }) => {
            if (input.email === User.email)
                return User;
            else throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found",
            });
        }),

    updateUser: UserProcedure
        .input(z.object({ name: z.string().optional(), age: z.number().optional() }))
        .output(UserInfoObject.extend({ success: z.boolean() }))
        .mutation(({ input }) => {
            // update user logic here
            return { success: true, name: input.name || User.name, age: input.age || 18, email: input.email };
        }),

});