import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../../datasources/NavItemJournalDataSource.js";
import { NavItemJournalTemplate } from "../../types/enum.js";
import { NavItemJournalBatch } from "../../types/enum.js";
import { getDocumentNumber } from "../../utils/util.js";
import livestockService from "./LivestockService.js";

export const gradeOffPostEntry = async (input: any, user: any) => {
  const standardJournalLines = await getStandardJournalLines(
    input.event,
    NavItemJournalTemplate.GradeOff
  );

  if (standardJournalLines.length === 0) {
    throw Error(`Event ${input.event} not found.`);
  }

  const job = await livestockService.getJob(input.job);

  for (const entry of input.quantities) {
    const line = standardJournalLines.find(
      (standardJournalLines) => standardJournalLines.Reason_Code === entry.code
    );
    if (entry.quantity > 0 && line) {
      await postItemJournalLine({
        ...line,
        Journal_Batch_Name: NavItemJournalBatch.FarmApp,
        Document_No: getDocumentNumber("GRDOFF", user.name),
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
