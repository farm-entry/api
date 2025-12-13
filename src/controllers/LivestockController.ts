import { NextFunction, Request, Response } from "express";
import livestockService from "../services/LivestockService.js";

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await livestockService.getJobs();
  res.status(200).json(jobs);
};

export const getJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jobNumber = req.params.number;
  const job = await livestockService.getJobDetails(jobNumber);
  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
};

export const getStandardJournalsByTemplate = async (
  req: Request,
  res: Response
) => {
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
};

export const getStandardJournalLines = async (req: Request, res: Response) => {
  try {
    const template = req.query.template as string;
    const code = req.query.code as string;
    if (!template || !code) {
      return res
        .status(400)
        .json({ message: "Template and code query parameters are required" });
    }
    const lines = await livestockService.getNavStandardJournalLines(
      template,
      code
    );
    res.status(200).json(lines);
  } catch (error: any) {
    //next(error);
  }
};

export const postEntry = async (req: Request, res: Response) => {
  const input = req.body;
  const user = req.session.user;
  await livestockService.postEntry(input, user);
  res.status(201).json({ message: "Entry posted successfully" });
};
