import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../../datasources/NavItemJournalDataSource.js";
import { getLivestockJob } from "../../datasources/NavJobDataSource.js";
import { NavItemJournalTemplate } from "../../types/enum.js";
import { NavItemJournalBatch } from "../../types/enum.js";
import { getDocumentNumber } from "../../utils/util.js";

interface GradeOffInput {
  event: string;
  job: string;
  group: string;
  comments?: string;
  livestockWeight: number;
  postingDate: string;
  quantities: {
    code: string;
    quantity: number;
  }[];
}

export const gradeOffPostEntry = async (
  input: GradeOffInput,
  username: string
) => {
  const standardJournalLines = await getStandardJournalLines(
    input.event,
    NavItemJournalTemplate.GradeOff
  );

  if (standardJournalLines.length === 0) {
    throw Error(`Event ${input.event} not found.`);
  }

  const job = await getLivestockJob(input.job);
  if (!job) {
    throw Error(`Job ${input.group} not found.`);
  }

  for (const entry of input.quantities) {
    const line = standardJournalLines.find(
      (standardJournalLines) => standardJournalLines.Reason_Code === entry.code
    );
    if (entry.quantity > 0 && line) {
      await postItemJournalLine({
        ...line,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("GRDOFF", username),
        Description: input.comments,
        Location_Code: line.Location_Code
          ? line.Location_Code
          : job.Location_Code,
        Quantity: entry.quantity,
        Weight: input.livestockWeight * entry.quantity,
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
