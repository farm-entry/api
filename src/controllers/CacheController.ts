import { Request, Response } from "express";
import { dataCache } from "../config/cache.js";

export const clearAllCaches = async (req: Request, res: Response) => {
  const statsBefore = dataCache.getStats();
  dataCache.clearAll();
  const statsAfter = dataCache.getStats();

  res.status(200).json({
    message: "All caches cleared successfully",
    clearedCount: statsBefore.size,
    remainingCount: statsAfter.size,
  });
};

export const clearSpecificCache = async (req: Request, res: Response) => {
  const { key } = req.params;
  const statsBefore = dataCache.getStats();
  const hadKey = statsBefore.keys.includes(key);

  dataCache.clear(key);

  res.status(200).json({
    message: hadKey
      ? `Cache key '${key}' cleared successfully`
      : `Cache key '${key}' was not found`,
    keyExists: hadKey,
  });
};

export const getCacheStats = async (req: Request, res: Response) => {
  const stats = dataCache.getStats();
  res.status(200).json({
    ...stats,
    message: "Cache statistics retrieved successfully",
  });
};
