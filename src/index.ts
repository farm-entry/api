import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  res.send("healthy");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
