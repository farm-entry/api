import { NextFunction, Request, Response } from "express";
import { APP_ERROR_MESSAGE } from "../constants/constants.js";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Unhandled error:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on our end. Please try again later.",
    timestamp: new Date().toISOString(),
  });
};
