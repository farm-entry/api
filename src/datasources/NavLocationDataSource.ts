import { ILocation } from "../types/payload.js";
import { navGet } from "./NavConfig.js";

export const getLocationByCode = async (code: string): Promise<ILocation> => {
  return await navGet(`Locations('${code}')`);
};
