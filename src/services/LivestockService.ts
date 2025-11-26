import {
  getLivestockJobs,
  getLivestockJob,
  getStandardJournals,
} from "../datasources/NavJobDataSource.js";
import { getStandardJournalLines } from "../datasources/NavItemJournalDataSource.js";
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

const getJobDetails = async (jobNumber: string): Promise<Job | undefined> => {
  const navJob = await getLivestockJob(jobNumber);
  return navJob ? Job.create(navJob) : undefined;
};

const getStandardJournalsByTemplate = async (template: string) => {
  return await getStandardJournals(template);
};

const getNavStandardJournalLines = async (template: string, code: string) => {
  return await getStandardJournalLines(template, code);
};

const livestockService = {
  getJobs,
  getJobDetails,
  getStandardJournalsByTemplate,
  getNavStandardJournalLines,
};

export default livestockService;
