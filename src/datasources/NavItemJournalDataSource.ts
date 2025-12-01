import { logger } from "../config/logger.js";
import { NavItemJournalLine } from "../types/nav.js";
import { navDate } from "../utils/util.js";
import { navGet, buildFilter, navPost } from "./NavConfig.js";

export interface StandardJournalOptions {
  code: string;
  template: string;
}

export async function postItemJournalLine(entry: Partial<NavItemJournalLine>) {
  const date = navDate(new Date());
  entry.Document_Date = date;
  entry.Posting_Date = entry.Posting_Date
    ? entry.Posting_Date.split("T")[0] || date
    : date;
  entry.Description = entry.Description || " ";
  return navPost("/ItemJournal", entry);
}

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
