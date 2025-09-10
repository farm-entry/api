import { Request, Response } from 'express';
import UserSettingsModel from '../models/UserSettings.js';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.NAV_USER;
const password = process.env.NAV_ACCESS_KEY;
const baseUrl = process.env.NAV_BASE_URL;
const credentials = Buffer.from(`${username}:${password}`).toString("base64");
const headers = {
  "Authorization": `Basic ${credentials}`,
  "Accept": "application/json",
  "Content-Type": "application/json",
};

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
    console.log(baseUrl);
    const response = await fetch(`${baseUrl}/Users`, {
      headers: headers
    });
    const users = await response.json();
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

// TODO: MW
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { user, password } = req.body;
//     const response = await fetch(`${baseUrl}/User?$filter=User_Name eq '${user}'`, {
//       headers: {
//         "Authorization": `Basic ${Buffer.from(
//           `${username}:${password}`
//         ).toString("base64")}`
//       }
//     });
//     const users = await response.json();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     res.status(500).json({ message: "Error fetching users", error: errorMessage });
//   }
// };

const userController = {
  getUser,
  getNavUsers,
  createUser
};

export default userController;