
import { NavReason, NavStandardItemJournal } from "../types/nav.js";
import { ICodeDescription } from "../types/types.js";

export class Event implements ICodeDescription {
    static Event(journal: NavStandardItemJournal, reasons: NavReason[]): Event {
        throw new Error("Method not implemented.");
    }
    code: string;
    description: string;
    reasons?: ICodeDescription[];

    private constructor(data: NavStandardItemJournal, reasons?: NavReason[]) {
        this.code = data.Code;
        this.description = data.Description;
        this.reasons = reasons?.map(r => ({ code: r.Code, description: r.Description }));
    }

    static create(data: NavStandardItemJournal, reasons?: NavReason[]): Event {
        return new Event(data, reasons);
    }
}
