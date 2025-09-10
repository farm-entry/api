import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from './logger.js';

dotenv.config();

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
  }
}
