import { Router } from "express";
import { getUser, getNavUsers, createUser, getNavUserByName } from "../controllers/UserController.js";

const userRouter: Router = Router();

userRouter.get("/", getNavUsers);
userRouter.get("/:name", getUser);
userRouter.post("/", createUser);
userRouter.post("/login", getNavUserByName);

export default userRouter;
