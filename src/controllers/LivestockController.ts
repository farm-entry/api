import { NextFunction, Request, Response } from "express";
import livestockService from "../services/livestock/LivestockService.js";

export const getJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobs = await livestockService.getJobs();
    res.status(200).json(jobs);
  } catch (error: any) {
    next(error);
  }
};

export const getJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobNumber = req.params.number;
    const job = await livestockService.getJobDetails(jobNumber);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error: any) {
    next(error);
  }
};

export const getStandardJournalsByTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const template = req.query.template as string;
    if (!template) {
      return res
        .status(400)
        .json({ message: "Template query parameter is required" });
    }
    const journals = await livestockService.getStandardJournalsByTemplate(
      template
    );
    res.status(200).json(journals);
  } catch (error: any) {
    next(error);
  }
};

export const postEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = req.body;
    const user = req.session.user;
    await livestockService.postEntry(input, user);
    res.status(201).json({ message: "Entry posted successfully" });
  } catch (error: any) {
    next(error);
  }
};
