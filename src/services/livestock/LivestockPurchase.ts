import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../../datasources/NavItemJournalDataSource.js";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
} from "../../types/enum.js";
import { getDocumentNumber } from "../../utils/util.js";
import livestockService from "./LivestockService.js";

export const postPurchaseEntry = async (input: any, user: any) => {
  const [standardJournalLines] = await getStandardJournalLines(
    input.event,
    NavItemJournalTemplate.Purchase
  );

  if (!standardJournalLines) {
    throw Error(`Event ${input.event} not found`);
  }

  const job = await livestockService.getJob(input.job);

  await postItemJournalLine({
    ...standardJournalLines,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Document_No: getDocumentNumber("PURCH", user.name),
    Description: input.comments || " ",
    Location_Code: standardJournalLines.Location_Code
      ? standardJournalLines.Location_Code
      : job.Location_Code,
    Quantity: input.quantity,
    Weight: input.totalWeight,
    Posting_Date: input.postingDate,
    Job_No: input.job,
    Shortcut_Dimension_1_Code: standardJournalLines.Shortcut_Dimension_1_Code
      ? standardJournalLines.Shortcut_Dimension_1_Code
      : job.Entity,
    Shortcut_Dimension_2_Code: standardJournalLines.Shortcut_Dimension_2_Code
      ? standardJournalLines.Shortcut_Dimension_2_Code
      : job.Cost_Center,
    Meta: input.smallLivestockQuantity,
  });
};
