import { Router } from "express";
import {
  createUser,
  getUserByName,
  getNavUsers,
  getUserSettings,
} from "../controllers/UserController.js";

const userRouter: Router = Router();

userRouter.get("/:name", getUserByName);
userRouter.get("/", getNavUsers);
userRouter.post("/", createUser);

export default userRouter;
