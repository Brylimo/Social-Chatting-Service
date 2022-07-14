import express from "express";
import { postSignup, postLogin, getUser } from "../controllers/apiController";
import { protectedOnlyMiddleware, publicOnlyMiddleware } from "../middleware";

const apiRouter = express.Router();

apiRouter.post("/signup", publicOnlyMiddleware, postSignup);
apiRouter.post("/login", publicOnlyMiddleware, postLogin);
apiRouter.get("/user", protectedOnlyMiddleware, getUser);

export default apiRouter;