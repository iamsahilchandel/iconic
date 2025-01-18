import express from "express";
import cors from "cors";
import apiRouter from "./routes";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use("/api/v1", apiRouter);

export default app;
