import "reflect-metadata";
import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.use(express.json());
app.use(router);

app.listen(8888, () => console.log("Server is running"));
