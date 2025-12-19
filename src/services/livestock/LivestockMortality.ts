import { format, formatDistanceToNowStrict } from "date-fns";
import { lastDayOfWeek } from "date-fns";
import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../../datasources/NavItemJournalDataSource.js";
import { NavItemJournalTemplate } from "../../types/enum.js";
import { NavItemJournalBatch } from "../../types/enum.js";
import { getDateFromWeekNumber, getDocumentNumber } from "../../utils/util.js";
import livestockService from "./LivestockService.js";
import { getResourceByCode } from "../../datasources/NavResourceDataSource.js";
import { getLivestockJob } from "../../datasources/NavJobDataSource.js";

export const mortalityPostEntry = async (input: any, user: any) => {
  const standardJournalLines = await getStandardJournalLines(
    input.event,
    NavItemJournalTemplate.Mortality
  );

  if (standardJournalLines.length === 0) {
    throw Error(`Event ${input.event} not found.`);
  }

  const job = await getLivestockJob(input.job);
  if (!job) {
    throw Error(`Job ${input.group} not found.`);
  }

  const tempWeeks = calculateTempWeeks(job.No);
  const resourceNo = `${tempWeeks}MORTALITY`;
  const resource = await getResourceByCode(resourceNo);
  if (!resource) {
    throw Error(`Resource ${resourceNo} not found while posting mortality.`);
  }
  const weight = Number(resource.Unit_Price);

  for (const entry of input.quantities) {
    const line = standardJournalLines.find(
      (standardJournalLines) => standardJournalLines.Reason_Code === entry.code
    );
    if (entry.quantity > 0 && line) {
      await postItemJournalLine({
        ...line,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("MORT", user.name),
        Description: input.comments,
        Location_Code: job.Location_Code
          ? job.Location_Code
          : line.Location_Code,
        Quantity: entry.quantity,
        Weight: entry.quantity * weight,
        Posting_Date: input.postingDate,
        Job_No: input.job,
        Shortcut_Dimension_1_Code: line.Shortcut_Dimension_1_Code
          ? line.Shortcut_Dimension_1_Code
          : job.Entity,
        Shortcut_Dimension_2_Code: line.Shortcut_Dimension_2_Code
          ? line.Shortcut_Dimension_2_Code
          : job.Cost_Center,
      });
    }
  }
};

const calculateTempWeeks = (groupNo: string): number => {
  try {
    const jobYear = Number("20" + groupNo.substring(0, 2));
    const jobWeek = Number(groupNo.substring(2, 4));
    const startDate = lastDayOfWeek(getDateFromWeekNumber(jobWeek, jobYear), {
      weekStartsOn: 2,
    });
    const daysDiff = Number(
      formatDistanceToNowStrict(startDate, { unit: "day" }).split(" ")[0]
    );
    return Math.min(24, Math.ceil(daysDiff / 7));
  } catch {
    return 24;
  }
};
