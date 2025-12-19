import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../../datasources/NavItemJournalDataSource.js";
import { getLivestockJob } from "../../datasources/NavJobDataSource.js";
import {
  NavEntryType,
  NavItemJournalBatch,
  NavItemJournalTemplate,
} from "../../types/enum.js";
import { getDocumentNumber } from "../../utils/util.js";

export const postAdjustmentEntry = async (input: any, user: any) => {
  const job = await getLivestockJob(input.job);
  if (!job) {
    throw Error(`Job ${input.group} not found.`);
  }
  const [standardJournal] = await getStandardJournalLines(
    input.event,
    NavItemJournalTemplate.Adjustment
  );

  if (!standardJournal) {
    throw Error(`Event ${input.event} not found.`);
  }

  await postItemJournalLine({
    ...standardJournal,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Entry_Type:
      input.quantity >= 0 ? NavEntryType.Positive : NavEntryType.Negative,
    Document_No: getDocumentNumber("ADJ", user.name),
    Description: input.comments,
    Location_Code: standardJournal.Location_Code
      ? standardJournal.Location_Code
      : job.Location_Code,
    Quantity: Math.abs(input.quantity),
    Weight: input.totalWeight,
    Posting_Date: input.postingDate,
    Job_No: input.job,
    Shortcut_Dimension_1_Code: standardJournal.Shortcut_Dimension_1_Code
      ? standardJournal.Shortcut_Dimension_1_Code
      : job.Entity,
    Shortcut_Dimension_2_Code: standardJournal.Shortcut_Dimension_2_Code
      ? standardJournal.Shortcut_Dimension_2_Code
      : job.Cost_Center,
  });
};
