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
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";

const app = express();

// Trust proxy for Heroku
if (process.env.NODE_ENV === "production" || process.env.DYNO) {
  app.set("trust proxy", 1);
}

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
  if (req.hostname === "localhost" || req.hostname === "127.0.0.1") {
    // For localhost, create a mock authenticated user in session
    req.session.authenticatedUser = {
      id: "dev-user",
      username: "dev",
      name: "Development User",
      loginTime: new Date(),
    };
    req.authenticatedUser = req.session.authenticatedUser;
    next();
  } else if (req.session && req.session.authenticatedUser) {
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

// Debug endpoint for Heroku
app.get("/debug/session", (req, res) => {
  res.json({
    sessionID: req.sessionID,
    hasSession: !!req.session,
    hasUser: !!(req.session && req.session.authenticatedUser),
    isProduction: process.env.NODE_ENV === "production",
    isHeroku: !!process.env.DYNO,
    trustProxy: app.get("trust proxy"),
    cookies: req.headers.cookie,
    userAgent: req.headers["user-agent"],
  });
});

app.use("/", authRoutes);
app.use("/api", isAuthenticated, routes);
app.use(errorMiddleware);

export default app;
