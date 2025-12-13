import { NextFunction, Request, Response } from "express";
import UserSettingsModel from "../models/UserSettings.js";
import { navGet } from "../datasources/NavConfig.js";
import { getNavUserByName } from "../datasources/NavUserDataSource.js";

export const getUserByName = async (req: Request, res: Response) => {
  const user = await getNavUserByName(req.params.name);
  res.status(200).json(user);
};

export const getNavUsers = async (req: Request, res: Response) => {
  const users = await navGet("Users");
  res.status(200).json(users);
};

export const getUserSettings = async (req: Request, res: Response) => {
  const username = req.params.name;
  const user = await UserSettingsModel.find({ username: username }).collation({
    locale: "en",
    strength: 2,
  }); //ignores case sensitivity
  if (user.length > 0) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, subdomain, menuOptions } = req.body;
  const newUser = new UserSettingsModel({ username, subdomain, menuOptions });
  await newUser.save();
  res.status(201).json(newUser);
};
