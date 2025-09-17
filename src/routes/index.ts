import { Router } from "express";
import { getUser, getNavUsers, createUser } from "../controllers/UserController.js";

const userRouter: Router = Router();

userRouter.get("/", getNavUsers);
userRouter.get("/:name", getUser);
userRouter.post("/", createUser);

const router: Router = Router();

router.use("/user", userRouter);

export default router;




