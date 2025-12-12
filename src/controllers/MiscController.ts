import { NextFunction, Request, Response } from "express";
import * as navMiscDataSource from "../datasources/NavMiscDataSource.js";

export const getAllHealthStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const healthStatuses = await navMiscDataSource.getAllHealthStatuses();
    res.status(200).json(healthStatuses);
  } catch (error: any) {
    next(error);
  }
};
