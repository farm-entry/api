import { Request, Response } from "express";
import livestockService from "../services/livestockService.js";

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await livestockService.getJobs();
  res.status(200).json(jobs);
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
