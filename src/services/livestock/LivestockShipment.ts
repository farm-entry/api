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

export const postShipmentEntry = async (input: any, user: any) => {
  const [standardJournal] = await getStandardJournalLines(
    NavItemJournalTemplate.Shipment,
    input.event
  );

  if (!standardJournal) {
    throw Error(`Event ${input.event} not found.`);
  }

  const job = await livestockService.getJob(input.group);
  await postItemJournalLine({
    ...standardJournal,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Document_No: getDocumentNumber(NavItemJournalTemplate.Shipment, user.name),
    Description: input.comments,
    ShortcutDimCode_x005B_5_x005D_: input.dimensionPacker,
    Location_Code: standardJournal.Location_Code
      ? standardJournal.Location_Code
      : job.Location_Code,
    Quantity: input.quantity,
    Weight: input.totalWeight,
    Posting_Date: input.postingDate,
    Job_No: input.job,
    Meta: input.deadsOnArrivalQuantity,
  });
};
