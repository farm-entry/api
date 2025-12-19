import { logger } from "../config/logger.js";
import { NavItemJournalLine, NavStandardItemJournal } from "../types/nav.js";
import { navDate } from "../utils/util.js";
import { navGet, buildFilter, navPost } from "./NavConfig.js";

export interface StandardJournalOptions {
  code: string;
  template: string;
}

export async function postItemJournalLine(entry: Partial<NavItemJournalLine>) {
  const date = navDate(new Date());
  const validEntry = validateEntry(entry);
  validEntry.Document_Date = validEntry.Document_Date || date;
  validEntry.Posting_Date = validEntry.Posting_Date || date;
  validEntry.Description = validEntry.Description || " ";

  logger.info("Posting item journal line:", validEntry);
  return navPost("/ItemJournal", validEntry);
}

export const getStandardJournals = async (
  template: string
): Promise<NavStandardItemJournal[]> => {
  const filter = buildFilter((f) =>
    f.equals("Journal_Template_Name", template)
  );
  return await navGet(`/StandardItemJournals`, filter);
};

export const getStandardJournalLines = async (
  template: string,
  code: string
): Promise<NavItemJournalLine[]> => {
  let filter = buildFilter((f) =>
    f.and(
      f.equals("Journal_Template_Name", template),
      f.equals("Standard_Journal_Code", code)
    )
  );
  const lines: NavItemJournalLine[] = await navGet(
    `/StandardItemJournal`,
    filter
  );
  return lines.map(
    // We have to strip these out so that submitting these lines to the journal doesn't break.
    ({ Standard_Journal_Code, Line_No, ...line }: any) => line
  );
};

export const getStandardJournalByCode = async (
  template: string,
  code: string
): Promise<NavStandardItemJournal | null> => {
  return navGet(
    `/StandardItemJournals(Journal_Template_Name='${template}', Code='${code}')`
  );
};

const validateEntry = (
  entry: Partial<NavItemJournalLine>
): Partial<NavItemJournalLine> => {
  const validated: Partial<NavItemJournalLine> = { ...entry };
  if (validated.Quantity !== undefined) {
    validated.Quantity =
      typeof validated.Quantity === "string"
        ? parseFloat(validated.Quantity) || 0
        : validated.Quantity;
  }

  if (validated.Unit_Amount !== undefined) {
    validated.Unit_Amount =
      typeof validated.Unit_Amount === "string"
        ? parseFloat(validated.Unit_Amount) || 0
        : validated.Unit_Amount;
  }

  if (validated.Amount !== undefined) {
    validated.Amount =
      typeof validated.Amount === "string"
        ? parseFloat(validated.Amount) || 0
        : validated.Amount;
  }

  if (validated.Unit_Cost !== undefined) {
    validated.Unit_Cost =
      typeof validated.Unit_Cost === "string"
        ? parseFloat(validated.Unit_Cost) || 0
        : validated.Unit_Cost;
  }

  if (validated.Weight !== undefined) {
    validated.Weight =
      typeof validated.Weight === "string"
        ? parseFloat(validated.Weight) || 0
        : validated.Weight;
  }

  if (validated.Meta !== undefined) {
    validated.Meta =
      typeof validated.Meta === "string"
        ? parseFloat(validated.Meta) || 0
        : validated.Meta;
  }

  return validated;
};
