import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/user", userRouter);

export default app;
