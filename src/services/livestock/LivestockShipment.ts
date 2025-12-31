import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../../datasources/NavItemJournalDataSource.js";
import { getLivestockJob } from "../../datasources/NavJobDataSource.js";
import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
} from "../../types/enum.js";
import { getDocumentNumber } from "../../utils/util.js";

interface ShipmentEntryInput {
  event: string;
  group: string;
  comments?: string;
  dimensionPacker: string;
  quantity: number;
  totalWeight: number;
  postingDate: string;
  deadsOnArrivalQuantity?: number;
}

export const postShipmentEntry = async (
  input: ShipmentEntryInput,
  username: string
) => {
  const [standardJournal] = await getStandardJournalLines(
    NavItemJournalTemplate.Shipment,
    input.event
  );

  if (!standardJournal) {
    throw Error(`Event ${input.event} not found.`);
  }

  const job = await getLivestockJob(input.group);
  if (!job) {
    throw Error(`Job ${input.group} not found.`);
  }

  await postItemJournalLine({
    ...standardJournal,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Document_No: getDocumentNumber(NavItemJournalTemplate.Shipment, username),
    Description: input.comments,
    ShortcutDimCode_x005B_5_x005D_: input.dimensionPacker,
    Location_Code: standardJournal.Location_Code
      ? standardJournal.Location_Code
      : job.Location_Code,
    Quantity: input.quantity,
    Weight: input.totalWeight,
    Posting_Date: input.postingDate,
    Job_No: input.group,
    Meta: input.deadsOnArrivalQuantity,
  });
};
