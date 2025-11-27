import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "./logger.js";

dotenv.config();

export async function connectDatabase() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not set");
    }
    logger.info("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoUrl);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
  }
}
