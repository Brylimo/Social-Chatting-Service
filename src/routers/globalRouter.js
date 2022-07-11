import express from "express";
import { handleHome, handleSignUp } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/signup", handleSignUp);

export default globalRouter;