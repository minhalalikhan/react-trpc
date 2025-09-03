import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../backend/src/trpc";

export const trpc = createTRPCReact<AppRouter>();

export function trpcClient() {
    return trpc.createClient({
        links: [
            httpBatchLink({
                url: "http://localhost:4000/trpc", // backend URL
            }),
        ],
    });
}
