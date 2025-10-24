import { Router } from "express";
import userRouter from "./userRoutes.js";
import livestockRouter from "./livestockRoutes.js";

const router: Router = Router();
router.use("/user", userRouter);
router.use("/livestock", livestockRouter);

export default router;
