import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Request, Response, NextFunction } from "express";
import routes from "./routes/index.js";
import createSessionConfig from "./config/session.js";
import { config } from "dotenv";
import { createNavConfig } from "./services/NavConfig.js";

const app = express();

app.use(express.json());

// Express session configuration
app.use(session(createSessionConfig()));

// Authentication middleware to protect routes
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({
      error: "Unauthorized",
      message: "Please log in to access this resource"
    });
  }
};

app.get("/protected", isAuthenticated, (req, res) => {
  res.json({
    message: "You are authenticated and can access this protected route.",
    user: req.session.user
  });
});


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Farm Entry API!",
    status: "healthy",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV
  });
});

// Session management routes
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const config = createNavConfig();

  // Simple authentication (replace with real authentication)
  if (username && password) {
    const url = `${config.baseUrl}/Users?$filter=User_Name eq '${username}'`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${username}:${password}`
        ).toString("base64")}`
      }
    });

    if (!response.ok) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid credentials"
      });
    }

    const userData = await response.json();

    if (!userData.value || userData.value.length === 0) {
      return res.status(401).json({
        error: "User not found",
        message: "No user found with the provided credentials"
      });
    } else {
      const user = userData.value[0];
      req.session.user = {
        id: user.Id,
        username: user.User_Name,
        name: user.Full_Name,
        loginTime: new Date()
      };
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({
            error: "Session save failed",
            message: "Could not persist session"
          });
        }
      });
    }
    res.json({
      message: "Login successful",
      user: req.session.user
    });
  } else {
    res.status(400).json({
      error: "Invalid credentials",
      message: "Username and password required"
    });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Could not log out" });
    } else {
      res.json({ message: "Logout successful" });
    }
  });
});

app.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user,
      sessionID: req.sessionID
    });
  } else {
    res.json({
      authenticated: false,
      message: "No active session"
    });
  }
});

app.use("/api", isAuthenticated, routes);

export default app;
