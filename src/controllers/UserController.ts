import { Request, Response } from "express";
import UserSettingsModel from "../models/UserSettings.js";
import { navGet } from "../datasources/navConfig.js";
import { getNavUserByName } from "../datasources/navUserDataSource.js";
import { getLivestockJobs } from "../datasources/navJobDataSource.js";

export const getUserByName = async (req: Request, res: Response) => {
  const user = await getNavUserByName(req.params.name);
  res.status(200).json(user);
};

export const getNavUsers = async (req: Request, res: Response) => {
  try {
    const users = await navGet("Users");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Error fetching users: ${errorMessage}`);
  }
};

export const getUserSettings = async (req: Request, res: Response) => {
  try {
    const username = req.params.name;
    const user = await UserSettingsModel.find({ username: username }).collation(
      { locale: "en", strength: 2 }
    ); //ignores case sensitivity
    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, subdomain, menuOptions } = req.body;
    const newUser = new UserSettingsModel({ username, subdomain, menuOptions });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
