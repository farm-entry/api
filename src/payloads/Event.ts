
import { NavReason, NavStandardItemJournal } from "../types/nav.js";
import { ICodeDescription } from "../types/types.js";

export class Event implements ICodeDescription {
    code: string;
    description: string;
    reasons?: ICodeDescription[];

    private constructor(data: NavStandardItemJournal, reasons?: NavReason[]) {
        this.code = data.Code;
        this.description = data.Description;
        this.reasons = reasons?.map(r => ({ code: r.Code, description: r.Description }));
    }

    static async create(data: NavStandardItemJournal, reasons?: NavReason[]): Promise<Event> {
        return new Event(data, reasons);
    }
}
