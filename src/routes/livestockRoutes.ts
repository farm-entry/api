import { Router } from "express";
import { getJobs } from "../controllers/livestockController.js";

const livestockRouter: Router = Router();

livestockRouter.get("/", getJobs);

export default livestockRouter;
