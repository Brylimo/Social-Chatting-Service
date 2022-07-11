import express from "express";
import logger from "morgan";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(logger("dev"));

app.use("/", globalRouter);

export default app;
