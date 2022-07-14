import express from "express";
import { postSignup, postLogin } from "../controllers/apiController";

const apiRouter = express.Router();

apiRouter.post("/signup", postSignup);
apiRouter.post("/login", postLogin);

export default apiRouter;