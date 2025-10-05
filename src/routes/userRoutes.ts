import { Router } from "express";
import { createUser, getUserByName, getNavUsers, getUserSettings } from "../controllers/userController.js";

const userRouter: Router = Router();

userRouter.get("/:name", getUserByName);
userRouter.get("/", getNavUsers);
userRouter.post("/", createUser);

export default userRouter;
