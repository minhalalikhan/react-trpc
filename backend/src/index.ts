import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";

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

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});