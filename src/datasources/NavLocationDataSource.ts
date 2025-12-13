import { NavInventory, NavLocation } from "../types/nav.js";
import { buildFilter, navGet } from "./NavConfig.js";

export const getLocationByCode = async (
  code: string
): Promise<NavLocation | undefined> => {
  return code.length > 0 ? navGet(`Locations('${code}')`) : undefined;
};

export const getInventoryByJob = async (
  jobNo: string
): Promise<NavInventory[]> => {
  let filter = buildFilter((f) => f.equals("Job_No", jobNo));
  return navGet(`/InventoryByJob?$filter=${filter}`);
};
