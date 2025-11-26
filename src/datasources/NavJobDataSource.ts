import { navGet, NavODataOptions, buildFilter } from "./NavConfig.js";
import { NavJob, NavStandardItemJournal } from "../types/nav.js";

export const getLivestockJobs = async (): Promise<NavJob[]> => {
  return await navGet("JobsLivestock");
};

export const getLivestockJob = async (
  jobNumber: string
): Promise<NavJob | undefined> => {
  return await navGet(`JobsLivestock('${jobNumber}')`);
};

export const getStandardJournals = async (
  template: string
): Promise<NavStandardItemJournal[]> => {
  const filter = buildFilter((f) =>
    f.equals("Journal_Template_Name", template)
  );
  return await navGet(`/StandardItemJournals`, filter);
};
