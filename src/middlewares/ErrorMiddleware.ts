import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  status?: number;
  message: string;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong on our end";

  res.status(status).json({
    error: "Error",
    message,
    timestamp: new Date().toISOString(),
  });
};
