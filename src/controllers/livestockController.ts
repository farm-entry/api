import { Request, Response } from "express";
import { getLivestockJobs } from "../datasources/navJobDataSource.js";

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await getLivestockJobs();
  res.status(200).json(jobs);
};
