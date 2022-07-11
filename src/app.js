import express from "express";
import logger from "morgan";
import globalRouter from "./routers/globalRouter";

const app = express();

app.set("views", __dirname + '/views');

app.set("view engine", 'ejs');
app.engine("html", require('ejs').renderFile);

app.use(logger("dev"));
app.use("/", globalRouter);
app.use(express.static(__dirname + "/public"));

export default app;