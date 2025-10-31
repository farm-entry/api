import { Router } from "express";
import {
  getJobs,
  getStandardJournalsByTemplate,
} from "../controllers/livestockController.js";

const livestockRouter: Router = Router();

livestockRouter.get("/jobs", getJobs);
livestockRouter.get("/events", getStandardJournalsByTemplate);

export default livestockRouter;
