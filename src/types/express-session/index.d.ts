import "express-session";
import { NavConfig } from "../../datasources/navConfig.ts";

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
