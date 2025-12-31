import { NextFunction, Request, Response } from "express";
import livestockService from "../services/livestock/LivestockService.js";
import { NavItemJournalTemplate } from "../types/enum.js";
import { getAllHealthStatuses } from "../datasources/NavMiscDataSource.js";

export const getJobs = async (req: Request, res: Response) => {
  const jobs = await livestockService.getJobs();
  res.status(200).json(jobs);
};

export const getJob = async (req: Request, res: Response) => {
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
  const job = req.query.job as string;
  console.log("Received request with template:", template, "and job:", job);
  if (!template) {
    return res
      .status(400)
      .json({ message: "Template query parameter is required" });
  }
  if (template === NavItemJournalTemplate.Mortality && !job) {
    return res.status(400).json({
      message: "Job query parameter is required for Mortality template",
    });
  }
  const journals = await livestockService.getStandardJournalsByTemplate(
    template,
    job
  );
  const healthStatuses = await livestockService.getHealthStatuses();
  const response = { journals, healthStatuses };
  res.status(200).json(response);
};

export const postEntry = async (req: Request, res: Response) => {
  const input = req.body;
  const user = req.authenticatedUser!.username;
  await livestockService.postEntry(input, user);
  res.status(201).json({ message: "Entry posted successfully" });
};
