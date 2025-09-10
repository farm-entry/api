import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

// Use the main router which includes all route modules
app.use("/api", routes);

export default app;
