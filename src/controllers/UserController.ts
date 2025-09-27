import { Request, Response } from 'express';
import UserSettingsModel from '../models/UserSettings.js';
import { navGet, navPost, createNavConfig, NavODataOptions } from '../services/NavConfig.js';

export const getUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.name;
    const user = await UserSettingsModel.find({ username: username });

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

export const getNavUsers = async (req: Request, res: Response) => {
  try {
    const navConfig = createNavConfig();

    // You can now easily add OData query options
    const options: NavODataOptions = {
      select: 'User_Name,Full_Name,E_Mail', // Only get specific fields
      top: 100 // Limit results
    };

    const users = await navGet(navConfig, 'Users', options);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: "Error fetching users", error: errorMessage });
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

export const getNavUserByName = async (req: Request, res: Response) => {
  try {
    const navConfig = createNavConfig();
    const userName = req.params.name;
    const options: NavODataOptions = {
      filter: `User_Name eq '${userName}'`
    };

    const users = await navGet(navConfig, 'Users', options);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user from Nav:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: "Error fetching user from Nav", error: errorMessage });
  }
};

const userController = {
  getUser,
  getNavUsers,
  getNavUserByName,
  createUser
};

export default userController;