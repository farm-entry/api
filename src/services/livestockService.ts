import {
  getLivestockJobs,
  getStandardJournals,
} from "../datasources/NavJobDataSource.js";

const getJobs = async () => {
  const navJobs = await getLivestockJobs();
  //TODO: Map to payloads
  return navJobs;
};

const getStandardJournalsByTemplate = async (template: string) => {
  return await getStandardJournals(template);
};

const livestockService = {
  getJobs,
  getStandardJournalsByTemplate,
};

export default livestockService;
