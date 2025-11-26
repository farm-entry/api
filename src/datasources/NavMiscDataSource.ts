import { NavHealthStatus } from "../types/nav.js";
import { navGet } from "./NavConfig.js";

export const getHealthStatus = async (
  status: string
): Promise<NavHealthStatus> => {
  return navGet(`HealthStatus('${status}')`);
};
