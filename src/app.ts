import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send({
    message: "pong",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    port: process.env.PORT
  });
});

app.get("/", (req, res) => {
  res.send({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV
  });
});

app.use("/api", routes);

export default app;
