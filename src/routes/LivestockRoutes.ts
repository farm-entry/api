import { Router } from "express";
import {
  getJob,
  getJobs,
  getStandardJournalsByTemplate,
  postEntry,
} from "../controllers/LivestockController.js";

const livestockRouter: Router = Router();

livestockRouter.get("/jobs", getJobs);
livestockRouter.get("/jobs/:number", getJob);
livestockRouter.get("/events", getStandardJournalsByTemplate);
livestockRouter.post("/", postEntry);

export default livestockRouter;
