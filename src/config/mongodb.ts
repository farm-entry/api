import mongoose from "mongoose";

export function connectDatabase() {
  try {
    mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/farmapp-local",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
