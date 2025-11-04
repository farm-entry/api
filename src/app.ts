import express from "express";
import session from "express-session";
import { Request, Response, NextFunction } from "express";
import routes from "./routes/index.js";
import createSessionConfig from "./config/session.js";
import authRoutes from "./routes/AuthRoutes.js";
import swaggerUi, {
  swaggerDocument,
  swaggerOptions,
} from "./config/swagger.js";

const app = express();

app.use(express.json());
app.use(session(createSessionConfig()));

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

// Swagger JSON endpoint
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});

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
