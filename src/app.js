import express from "express";
import logger from "morgan";
import helmet from "helmet";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import apiRouter from "./routers/apiRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.set("views", __dirname + '/views');

app.set("view engine", 'ejs');
app.engine("html", require('ejs').renderFile);

app.use(helmet());
app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
	secret: "gamespring!!@",
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30, 
	},
	store: new PrismaSessionStore(
		new PrismaClient(),
		{
		  checkPeriod: 2 * 60 * 1000,  //ms
		  dbRecordIdIsSessionId: true,
		  dbRecordIdFunction: undefined,
		}
	  )
}));
app.use("/", globalRouter);
app.use("/api", apiRouter);
app.use("/static", express.static("public"));

export default app;