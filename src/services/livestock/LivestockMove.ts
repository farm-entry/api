import {
  getStandardJournalLines,
  postItemJournalLine,
} from "../../datasources/NavItemJournalDataSource.js";
import { getInventoryByJob } from "../../datasources/NavLocationDataSource.js";
import {
  NavItemJournalTemplate,
  NavEntryType,
  NavItemJournalBatch,
} from "../../types/enum.js";
import { NavItemJournalLine } from "../../types/nav.js";
import { getDocumentNumber } from "../../utils/util.js";
import livestockService from "./LivestockService.js";

export const movePostEntry = async (input: any, user: any) => {
  const formType = input.form.toUpperCase() as NavItemJournalTemplate;
  const standardJournal = await getStandardJournalLines(formType, input.event);

  const standardJournalPos = standardJournal.find(
    (item) => item.Entry_Type === NavEntryType.Positive
  );

  const standardJournalNeg = standardJournal.find(
    (item) => item.Entry_Type === NavEntryType.Negative
  );

  if (!standardJournalNeg || !standardJournalPos) {
    throw Error(`Event ${input.event} not found.`);
  }

  const docNo = getDocumentNumber("MOVE", user.name);
  const fromJob = await livestockService.getJob(input.fromJob);
  const toJob = await livestockService.getJob(input.toJob);

  const negPrice: number = await getUnitCost(standardJournalNeg, input.fromJob);
  const posPrice: number = await getUnitCost(standardJournalPos, input.fromJob); //use fromJob for both cost basis

  await postItemJournalLine({
    ...standardJournalNeg,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Document_No: docNo,
    Description: input.comments,
    Location_Code: standardJournalNeg.Location_Code
      ? standardJournalNeg.Location_Code
      : fromJob.Location_Code,
    Quantity: input.quantity,
    Weight: input.totalWeight,
    Posting_Date: input.postingDate,
    Job_No: input.fromJob,
    Shortcut_Dimension_1_Code: standardJournalNeg.Shortcut_Dimension_1_Code
      ? standardJournalNeg.Shortcut_Dimension_1_Code
      : fromJob.Entity,
    Shortcut_Dimension_2_Code: standardJournalNeg.Shortcut_Dimension_2_Code
      ? standardJournalNeg.Shortcut_Dimension_2_Code
      : fromJob.Cost_Center,
    Unit_Cost: negPrice,
  });

  await postItemJournalLine({
    ...standardJournalPos,
    Journal_Batch_Name: NavItemJournalBatch.FarmApp,
    Document_No: docNo,
    Description: input.comments,
    Location_Code: toJob.Location_Code,
    Quantity: input.quantity,
    Weight: input.totalWeight,
    Posting_Date: input.postingDate,
    Job_No: input.toJob,
    Shortcut_Dimension_1_Code: standardJournalPos.Shortcut_Dimension_1_Code
      ? standardJournalPos.Shortcut_Dimension_1_Code
      : fromJob.Entity,
    Shortcut_Dimension_2_Code: standardJournalPos.Shortcut_Dimension_2_Code
      ? standardJournalPos.Shortcut_Dimension_2_Code
      : fromJob.Cost_Center,
    Meta: input.smallLivestockQuantity,
    Unit_Cost: posPrice,
  });
};

const getUnitCost = async (
  standardJournal: NavItemJournalLine,
  fromJob: string
) => {
  let price: number;
  if (standardJournal.Unit_Amount && standardJournal.Unit_Amount > 0) {
    price = standardJournal.Unit_Amount;
  } else {
    const [locInv] = await getInventoryByJob(fromJob);
    if (locInv.StartQty > 0) {
      price = locInv.StartValue / locInv.StartQty;
    } else {
      price = 0;
    }
  }
  return price;
};
