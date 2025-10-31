import { navGet, NavODataOptions } from "./navConfig.js";
import { NavJob, NavStandardItemJournal } from "../types/nav.js";

export const getLivestockJobs = async (): Promise<NavJob[]> => {
  return await navGet("JobsLivestock");
};

export const getStandardJournals = async (
  template: string
): Promise<NavStandardItemJournal[]> => {
  const options: NavODataOptions = {
    filter: `Journal_Template_Name eq '${template}'`,
  };
  return await navGet(`/StandardItemJournals`, options);
};
