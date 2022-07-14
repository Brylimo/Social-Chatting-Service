import express from "express";
import { postSignup } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post("/signup", postSignup);

export default apiRouter;