import express from "express";
import { handleHome } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);

export default globalRouter;