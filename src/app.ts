import express from "express";
import { connectDatabase } from "./config/mongodb";
import UserSettingsModel from "./models/UserSettings";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDatabase();

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/user/:name", (req, res) => {
  const username = req.params.name;
  UserSettingsModel.find({ username: username })
    .then((user) => {
      if (user.length > 0) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Error fetching user" });
    });
});

app.post("/", (req, res) => {
  try {
    const newUser = new UserSettingsModel({
      subdomain: "moglerfarms",
      username: req.body.username,
    });
    newUser.save();
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error saving user" });
  }
  res.status(200).json({ message: "User saved successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
