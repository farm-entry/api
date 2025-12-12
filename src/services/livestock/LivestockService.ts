import {
  getLivestockJobs,
  getLivestockJob,
  getStandardJournals,
} from "../../datasources/NavJobDataSource.js";
import { Job } from "../../payloads/Job.js";
import { NavJob } from "../../types/nav.js";
import { NavItemJournalTemplate } from "../../types/enum.js";
import { movePostEntry } from "./LivestockMove.js";
import { gradeOffPostEntry } from "./LivestockGradeOff.js";
import { postWeanEntry } from "./LivestockWean.js";
import { postAdjustmentEntry } from "./LivestockAdjustment.js";

const getJobs = async () => {
  const navJobs = await getLivestockJobs();
  const jobs = await Promise.all(
    navJobs.map((job) => {
      return Job.create(job);
    })
  );
  return jobs;
};

const getJob = async (jobNumber: string): Promise<NavJob> => {
  return (
    (await getLivestockJob(jobNumber)) ??
    (() => {
      throw Error(`Job ${jobNumber} not found.`);
    })()
  );
};

const getJobDetails = async (jobNumber: string): Promise<Job | undefined> => {
  const navJob = await getLivestockJob(jobNumber);
  return navJob ? Job.create(navJob) : undefined;
};

const getStandardJournalsByTemplate = async (template: string) => {
  return await getStandardJournals(template);
};

const postEntry = async (input: any, user: any) => {
  const formType = input.form.toUpperCase() as NavItemJournalTemplate;
  switch (formType) {
    case NavItemJournalTemplate.Adjustment:
      return await postAdjustmentEntry(input, user);
    case NavItemJournalTemplate.Wean:
      return await postWeanEntry(input, user);
    case NavItemJournalTemplate.GradeOff:
      return await gradeOffPostEntry(input, user);
    case NavItemJournalTemplate.Move:
      return await movePostEntry(input, user);
    default:
      throw Error(`Event type ${input.eventType} not supported.`);
  }
};

const livestockService = {
  getJobs,
  getJob,
  getJobDetails,
  getStandardJournalsByTemplate,
  postEntry,
};

export default livestockService;
