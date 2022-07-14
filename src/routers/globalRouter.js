import express from "express";
import { handleHome, handleSignUp, handleMain, logout } from "../controllers/globalController";
import { protectedOnlyMiddleware, publicOnlyMiddleware } from "../middleware";

const globalRouter = express.Router();

globalRouter.get("/", publicOnlyMiddleware, handleHome);
globalRouter.get("/signup", publicOnlyMiddleware, handleSignUp);
globalRouter.get("/main", protectedOnlyMiddleware, handleMain);
globalRouter.get("/logout", protectedOnlyMiddleware, logout);

export default globalRouter;