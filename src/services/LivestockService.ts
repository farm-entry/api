import {
  getLivestockJobs,
  getLivestockJob,
  getStandardJournals,
} from "../datasources/NavJobDataSource.js";
import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../datasources/NavItemJournalDataSource.js";
import { Job } from "../payloads/Job.js";
import { NavJob } from "../types/nav.js";
import { getDocumentNumber } from "../utils/util.js";
import { NavItemJournalBatch, NavItemJournalTemplate } from "../types/enum.js";

const getJobs = async () => {
  const navJobs = await getLivestockJobs();
  const jobs = await Promise.all(
    navJobs.map((job) => {
      return Job.create(job);
    })
  );
  return jobs;
};

const getJob = async (jobNumber: string): Promise<NavJob | undefined> => {
  return await getLivestockJob(jobNumber);
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

const postEntry = async (input: any, user: any) => {
  const formType = input.form.toUpperCase() as NavItemJournalTemplate;
  switch (formType) {
    case "WEAN":
      return await standardPostEntry(input, user);
    default:
      throw Error(`Event type ${input.eventType} not supported.`);
  }
};

const standardPostEntry = async (input: any, user: any) => {
  const formType = input.form.toUpperCase() as NavItemJournalTemplate;
  const [standardJournal] = await getNavStandardJournalLines(
    formType,
    input.event
  );
  if (!standardJournal) {
    throw Error(`Event ${input.event} not found.`);
  }
  const job = await getJob(input.group);

  await postItemJournalLine({
    ...standardJournal,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Document_No: getDocumentNumber(formType, user.name),
    Description: input.comments,
    Location_Code: standardJournal.Location_Code
      ? standardJournal.Location_Code
      : job?.Location_Code,
    Quantity: Number(input.quantity),
    Weight: Number(input.totalWeight),
    Posting_Date: input.postingDate, // strip out timestamp if present
    Job_No: input.group,
    Meta: Number(input.smallLivestockQuantity),
  });
};

const movePostEntry = async (input: any, user: any) => {
  return null;
};

const livestockService = {
  getJobs,
  getJobDetails,
  getStandardJournalsByTemplate,
  getNavStandardJournalLines,
  postEntry,
};

export default livestockService;
