
import { NavStandardItemJournal } from "../types/nav.js";
import { ICodeDescription } from "../types/types.js";

export class CodeDescription implements ICodeDescription {
  code: string;
  description: string;

  private constructor(data: NavStandardItemJournal) {
    this.code = data.Code;
    this.description = data.Description;
  }

  static async create(data: NavStandardItemJournal): Promise<CodeDescription> {
    return new CodeDescription(data);
  }
}
