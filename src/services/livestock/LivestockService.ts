import {
  getLivestockJobs,
  getLivestockJob,
} from "../../datasources/NavJobDataSource.js";
import { Job } from "../../payloads/Job.js";
import { NavItemJournalTemplate } from "../../types/enum.js";
import { movePostEntry } from "./LivestockMove.js";
import { gradeOffPostEntry } from "./LivestockGradeOff.js";
import { postWeanEntry } from "./LivestockWean.js";
import { postAdjustmentEntry } from "./LivestockAdjustment.js";
import {
  getStandardJournalByCode,
  getStandardJournalLines,
  getStandardJournals,
} from "../../datasources/NavItemJournalDataSource.js";
import { mortalityPostEntry } from "./LivestockMortality.js";
import { postShipmentEntry } from "./LivestockShipment.js";
import { postPurchaseEntry } from "./LivestockPurchase.js";
import { Event } from "../../payloads/Event.js";
import {
  getAllHealthStatuses,
  getHealthStatus,
  getReasonCodeDescList,
} from "../../datasources/NavMiscDataSource.js";
import { BaseJob } from "../../payloads/BaseJob.js";
import { CodeDescription } from "../../payloads/CodeDescription.js";
import { withCache, CACHE_TTL } from "../../config/cache.js";

const getJobs: () => Promise<BaseJob[]> = async () => {
  const navJobs = await getLivestockJobs();
  const jobs = await Promise.all(
    navJobs.map((job) => {
      return BaseJob.create(job);
    })
  );
  return jobs;
};

const getJobDetails = async (jobNumber: string): Promise<Job | undefined> => {
  const navJob = await getLivestockJob(jobNumber);
  return navJob ? Job.create(navJob) : undefined;
};

const getStandardJournalsByTemplate = async (
  template: string,
  job?: string
): Promise<Event[] | Event> => {
  if (template === NavItemJournalTemplate.Mortality && job) {
    const jobDetails = await getJobDetails(job);
    if (!jobDetails) {
      throw Error(`Job ${job} not found.`);
    }
    const journal = await getStandardJournalByCode(
      template,
      jobDetails.postingGroup
    );
    if (!journal) {
      throw Error(
        `No standard journal found for template ${template} and posting group ${jobDetails.postingGroup}.`
      );
    }
    const lines = await getStandardJournalLines(template, journal.Code);
    const reasonCodes = lines.map((line) => line.Reason_Code);
    const reasons = await getReasonCodeDescList(reasonCodes);
    return Event.create(journal, reasons);
  } else if (template === NavItemJournalTemplate.GradeOff) {
    const journals = await getStandardJournals(template);
    const result = journals.map(async (journal) => {
      const lines = await getStandardJournalLines(template, journal.Code);
      const reasonCodes = lines.map((line) => line.Reason_Code);
      const reasons = await getReasonCodeDescList(reasonCodes);
      return Event.create(journal, reasons);
    });
    return Promise.all(result);
  } else {
    const journals = await getStandardJournals(template);
    const result = journals.map((j) => Event.create(j));
    return Promise.all(result);
  }
};

const postEntry = async (input: any, username: string) => {
  const formType = input.form.toUpperCase() as NavItemJournalTemplate;
  switch (formType) {
    case NavItemJournalTemplate.Adjustment:
      return await postAdjustmentEntry(input, username);
    case NavItemJournalTemplate.GradeOff:
      return await gradeOffPostEntry(input, username);
    case NavItemJournalTemplate.Mortality:
      return await mortalityPostEntry(input, username);
    case NavItemJournalTemplate.Move:
      return await movePostEntry(input, username);
    case NavItemJournalTemplate.Purchase:
      return await postPurchaseEntry(input, username);
    case NavItemJournalTemplate.Shipment:
      return await postShipmentEntry(input, username);
    case NavItemJournalTemplate.Wean:
      return await postWeanEntry(input, username);
    default:
      throw Error(`Event type ${input.eventType} not supported.`);
  }
};

const getHealthStatuses = async (): Promise<CodeDescription[]> => {
  return withCache(
    "health-statuses",
    async () => {
      const statuses = await getAllHealthStatuses();
      return Promise.all(
        statuses.map((status) => {
          return CodeDescription.fromGeneric(status);
        })
      );
    },
    CACHE_TTL.DAY
  );
};

const livestockService = {
  getHealthStatuses,
  getJobs,
  getJobDetails,
  getStandardJournalsByTemplate,
  getStandardJournalLines,
  postEntry,
};

export default livestockService;
