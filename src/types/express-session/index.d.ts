import "express-session";
import { NavConfig } from "../../datasources/NavConfig.ts";

declare module "express-session" {
  interface SessionData {
    user?: {
      id?: string;
      username?: string;
      name?: string;
      loginTime?: Date;
    };
    navConfig?: NavConfig;
  }
}
