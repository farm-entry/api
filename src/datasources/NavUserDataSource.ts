import { navGet, NavODataOptions } from "./NavConfig.js";
import { NavUser } from "../types/nav.js";

export const getNavUserByName = async (
  username: string
): Promise<NavUser | undefined> => {
  const options: NavODataOptions = {
    filter: `User_Name eq '${username}'`,
  };
  const user: NavUser[] = await navGet("Users", options);
  return user.length > 0 ? user[0] : undefined;
};

export const getUsers = async () => {
  return await navGet("Users");
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
