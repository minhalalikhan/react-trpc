import { createTRPCReact } from "@trpc/react-query";
import { createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import type { AppRouter } from "../../backend/src/trpc";

export const trpc = createTRPCReact<AppRouter>();




export function trpcClient() {
    return trpc.createClient({
        links: [

splitLink({
    condition(op) {
        return op.type === "subscription";
    },
    true: wsLink({
        client:createWSClient({
            url:"ws://localhost:4000/trpc",
        }),
    }),
    false: httpBatchLink({
        url: "http://localhost:4000/trpc", // backend URL
    }),
})


        ],
    });
}
