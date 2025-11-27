import {
  getLivestockJobs,
  getLivestockJob,
  getStandardJournals,
} from "../datasources/NavJobDataSource.js";
import { getStandardJournalLines } from "../datasources/NavItemJournalDataSource.js";
import { Job } from "../payloads/Job.js";

const getJobs = async () => {
  return await getLivestockJobs();
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

const postEntry = async (entryData: any) => {
  console.log("Posting entry:", entryData);
}

const livestockService = {
  getJobs,
  getJobDetails,
  getStandardJournalsByTemplate,
  getNavStandardJournalLines,
  postEntry
};

export default livestockService;
