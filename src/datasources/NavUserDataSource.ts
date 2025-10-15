import { Request, Response } from 'express';
import UserSettingsModel from '../models/UserSettings.js';
import { navGet, NavODataOptions } from '../datasources/NavConfig.js';

export const getNavUserByName = async (username: string) => {
  const options: NavODataOptions = {
    filter: `User_Name eq '${username}'`
  };
  return await navGet('Users', options);
};

export const getUsers = async (req: Request, res: Response) => {
  return await navGet('Users');
};

// export const createUserSettings = async (req: Request, res: Response) => {
//   try {
//     const { username, subdomain, menuOptions } = req.body;
//     const newUser = new UserSettingsModel({ username, subdomain, menuOptions });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Error creating user" });
//   }
// };

const userController = {
  getNavUserByName,
  getUsers
};

export default userController;