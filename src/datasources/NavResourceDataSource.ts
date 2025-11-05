import { NavResource } from "../types/nav.js";
import { navGet } from "./NavConfig.js";

export const getResourceByCode = async (
  code: string
): Promise<NavResource | undefined> => {
  return code.length > 0 ? navGet(`Resources('${code}')`) : undefined;
};
