import { NavHealthStatus } from "../types/nav.js";
import { navGet } from "./NavConfig.js";

export const getHealthStatus = async (
  status: string
): Promise<NavHealthStatus | undefined> => {
  return status.length > 0 ? navGet(`HealthStatus('${status}')`) : undefined;
};
