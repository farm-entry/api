import "express-session";
import { NavConfig } from "../../datasources/NavConfig.js";

export interface AuthenticatedUser {
  id: string;
  username: string;
  name?: string;
  loginTime: Date;
}

declare module "express-session" {
  interface SessionData {
    authenticatedUser?: AuthenticatedUser;
    navConfig?: NavConfig;
  }
}

declare global {
  namespace Express {
    interface Request {
      authenticatedUser?: AuthenticatedUser;
    }
  }
}
