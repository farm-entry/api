import { NavResource } from "../types/nav.js";
import { navGet } from "./NavConfig.js";

export const getResourceByCode = async (code: string): Promise<NavResource> => {
  return await navGet(`Resources('${code}')`);
};
