import { Router } from "express";
import userRouter from "./UserRoutes.js";
import livestockRouter from "./LivestockRoutes.js";

const router: Router = Router();
router.use("/user", userRouter);
router.use("/livestock", livestockRouter);

export default router;
