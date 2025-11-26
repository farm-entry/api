import { Router } from "express";
import {
  getJob,
  getJobs,
  getStandardJournalsByTemplate,
  getStandardJournalLines,
} from "../controllers/LivestockController.js";

const livestockRouter: Router = Router();

livestockRouter.get("/jobs", getJobs);
livestockRouter.get("/jobs/:number", getJob);
livestockRouter.get("/events", getStandardJournalsByTemplate);
livestockRouter.get("/test", getStandardJournalLines);

export default livestockRouter;
