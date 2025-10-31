import {
  getLivestockJobs,
  getStandardJournals,
} from "../datasources/navJobDataSource.js";

const getJobs = async () => {
  return await getLivestockJobs();
};

const getStandardJournalsByTemplate = async (template: string) => {
  return await getStandardJournals(template);
};

const livestockService = {
  getJobs,
  getStandardJournalsByTemplate,
};

export default livestockService;
