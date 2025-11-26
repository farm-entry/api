import { Router } from "express";
import userRouter from "./UserRoutes.js";
import livestockRouter from "./LivestockRoutes.js";
// import miscRouter from "./MiscRoutes.js";

const router: Router = Router();
router.use("/user", userRouter);
router.use("/livestock", livestockRouter);
// router.use("", miscRouter);

export default router;
