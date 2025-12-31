import { NavCodeDescription, NavStandardItemJournal } from "../types/nav.js";
import { ICodeDescription } from "../types/types.js";

export class CodeDescription implements ICodeDescription {
  code: string;
  description: string;

  private constructor(code: string, description: string) {
    this.code = code;
    this.description = description;
  }

  static fromNavData(data: NavStandardItemJournal): CodeDescription {
    return new CodeDescription(data.Code, data.Description);
  }

  static fromGeneric(data: NavCodeDescription): CodeDescription {
    return new CodeDescription(data.Code, data.Description);
  }
}
