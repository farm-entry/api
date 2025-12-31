import { Router } from "express";
import { createNavConfig } from "../datasources/NavConfig.js";

const authRoutes: Router = Router();

authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const config = createNavConfig();

  if (username && password) {
    const url = `${config.baseUrl}/Users?$filter=User_Name eq '${username}'`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          "base64"
        )}`,
      },
    });

    if (!response.ok) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid credentials",
      });
    }
    const userData = await response.json();
    if (!userData.value || userData.value.length === 0) {
      return res.status(401).json({
        error: "User not found",
        message: "No user found with the provided credentials",
      });
    } else {
      const user = userData.value[0];
      req.session.authenticatedUser = {
        id: user.Id,
        username: user.User_Name,
        name: user.Full_Name,
        loginTime: new Date(),
      };
      req.session.navConfig = {
        baseUrl: process.env.NAV_BASE_URL,
        username: username,
        password: password,
      };
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({
            error: "Session save failed",
            message: "Could not persist session",
          });
        }
      });
    }
    res.json({
      message: "Login successful",
      user: req.session.authenticatedUser,
      sessionID: req.sessionID,
      debug: {
        cookieName: req.sessionStore ? "connect.sid" : "unknown",
        sessionExists: !!req.session,
        userExists: !!req.session.authenticatedUser,
      },
    });
  } else {
    res.status(400).json({
      error: "Invalid credentials",
      message: "Username and password required",
    });
  }
});

authRoutes.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Could not log out" });
    } else {
      res.json({ message: "Logout successful" });
    }
  });
});

authRoutes.get("/session", (req, res) => {
  if (req.session.authenticatedUser) {
    res.json({
      authenticated: true,
      user: req.session.authenticatedUser,
      sessionID: req.sessionID,
    });
  } else {
    res.json({
      authenticated: false,
      message: "No active session",
    });
  }
});

export default authRoutes;
