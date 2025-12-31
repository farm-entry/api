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
interface WeanEntryInput {
  event: string;
  group: string;
  comments?: string;
  quantity: number;
  totalWeight: number;
  postingDate: string;
  smallLivestockQuantity?: number;
}

export const postWeanEntry = async (
  input: WeanEntryInput,
  username: string
) => {
  const [standardJournal] = await getStandardJournalLines(
    NavItemJournalTemplate.Wean,
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
    Document_No: getDocumentNumber(NavItemJournalTemplate.Wean, username),
    Description: input.comments,
    Location_Code: standardJournal.Location_Code
      ? standardJournal.Location_Code
      : job?.Location_Code,
    Quantity: input.quantity,
    Weight: input.totalWeight,
    Posting_Date: input.postingDate, // strip out timestamp if present
    Job_No: input.group,
    Meta: input.smallLivestockQuantity,
  });
};
