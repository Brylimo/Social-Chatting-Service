import express from "express";
import { postSignup, postLogin, getUser, getRoom, createRoom, patchRoom, getAllUser, postFollow } from "../controllers/apiController";
import { protectedOnlyMiddleware, publicOnlyMiddleware } from "../middleware";

const apiRouter = express.Router();

apiRouter.post("/signup", publicOnlyMiddleware, postSignup);
apiRouter.post("/login", publicOnlyMiddleware, postLogin);
apiRouter.get("/user", protectedOnlyMiddleware, getUser);
apiRouter.get("/room", getRoom);
apiRouter.post("/room", createRoom);
apiRouter.patch("/room", patchRoom);
apiRouter.get("/all/user", getAllUser);
apiRouter.post("/follow", postFollow);

export default apiRouter;