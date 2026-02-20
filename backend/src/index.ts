import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import { appRouter } from "./trpc";
import ws from "ws";

import cors from "cors";

const app = express();
const port = 4000;


app.use(cors());


app.get("/", (req, res) => {
    res.send("Hello from tRPC server !!");
});


app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: () => ({}), // put auth/session logic here if needed
    })
);

const server=app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});

applyWSSHandler({
    wss:new ws.Server({server,path:"/trpc"}),
    router:appRouter,
    createContext:()=>({}),
});

