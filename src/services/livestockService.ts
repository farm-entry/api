import {
  getLivestockJobs,
  getStandardJournals,
} from "../datasources/NavJobDataSource.js";
import { Job } from "../payloads/Job.js";

const getJobs = async () => {
  const navJobs = await getLivestockJobs();
  const jobs = await Promise.all(
    navJobs.map((job) => {
      return Job.create(job);
    })
  );
  return jobs;
};

const getStandardJournalsByTemplate = async (template: string) => {
  return await getStandardJournals(template);
};

const livestockService = {
  getJobs,
  getStandardJournalsByTemplate,
};

export default livestockService;
