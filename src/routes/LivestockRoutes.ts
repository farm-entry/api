import { Router } from "express";
import {
  getJob,
  getJobs,
  getStandardJournalsByTemplate,
} from "../controllers/LivestockController.js";

const livestockRouter: Router = Router();

livestockRouter.get("/jobs", getJobs);
livestockRouter.get("/jobs/:number", getJob);
livestockRouter.get("/events", getStandardJournalsByTemplate);

export default livestockRouter;
