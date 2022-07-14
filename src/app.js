import express from "express";
import logger from "morgan";
import apiRouter from "./routers/apiRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.set("views", __dirname + '/views');

app.set("view engine", 'ejs');
app.engine("html", require('ejs').renderFile);

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", globalRouter);
app.use("/api", apiRouter);
app.use("/static", express.static("public"));

export default app;