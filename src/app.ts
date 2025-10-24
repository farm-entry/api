import express from "express";
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import routes from "./routes/index.js";
import createSessionConfig from "./config/session.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(session(createSessionConfig()));

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({
      error: "Unauthorized",
      message: "Please log in to access this resource",
    });
  }
};

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV,
  });
});

app.use("/", authRoutes);
app.use("/api", isAuthenticated, routes);

export default app;
