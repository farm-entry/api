import { NavLocation } from "../types/nav.js";
import { navGet } from "./NavConfig.js";

export const getLocationByCode = async (
  code: string
): Promise<NavLocation | undefined> => {
  return code.length > 0 ? navGet(`Locations('${code}')`) : undefined;
};
