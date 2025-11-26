import { Router } from "express";
import { getAllHealthStatuses } from "../controllers/MiscController.js";

const miscRouter: Router = Router();

miscRouter.get("/healthstatus", getAllHealthStatuses);

export default miscRouter;
