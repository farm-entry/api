import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from './logger.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/farmapp-local";

export async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
  }
}
