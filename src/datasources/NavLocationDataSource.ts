import { ILocation } from "../types/payload.js";
import { navGet } from "./NavConfig.js";

export const getLocationByCode = async (
  code: string
): Promise<ILocation | undefined> => {
  return code.length > 0 ? navGet(`Locations('${code}')`) : undefined;
};
