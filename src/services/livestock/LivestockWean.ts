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

export const postWeanEntry = async (input: any, user: any) => {
  const [standardJournal] = await getStandardJournalLines(
    NavItemJournalTemplate.Wean,
    input.event
  );
  if (!standardJournal) {
    throw Error(`Event ${input.event} not found.`);
  }
  const job = await livestockService.getJob(input.group);

  await postItemJournalLine({
    ...standardJournal,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Document_No: getDocumentNumber(NavItemJournalTemplate.Wean, user.name),
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
