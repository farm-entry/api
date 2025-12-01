import { ICodeDescription } from "./types.js";

export interface NavCodeName {
  Code: string;
  Name: string;
}

export interface NavUser {
  Full_Name: string;
  License_Type: string;
  User_Name: string;
  User_Security_ID: string;
}

export interface NavJob {
  No: string;
  Description: string;
  Person_Responsible: string;
  Barn_Type: string;
  Location_Code: string;
  Entity: string;
  Cost_Center: string;
  Inventory_Left: number;
  Dead_Quantity: number;
  Start_Quantity: number;
  Start_Weight: number;
  Starting_Date: string;
  Ending_Date: string;
  Job_Posting_Group: string;
  Project_Manager: string;
  Status: string;
  HealthStatus: string;
}
export interface NavStandardItemJournal {
  Journal_Template_Name: string;
  Code: string;
  Description: string;
}
export interface NavResource {
  No: string;
  Name: string;
  Unit_Price: number;
}

export interface NavItemJournalLine {
  Journal_Template_Name: NavItemJournalTemplate;
  Journal_Batch_Name: NavItemJournalBatch;
  Posting_Date: string;
  Document_Date: string;
  Entry_Type: NavEntryType;
  Document_No: string;
  Item_No: string;
  Description: string;
  Shortcut_Dimension_1_Code: string;
  Shortcut_Dimension_2_Code: string;
  ShortcutDimCode_x005B_5_x005D_: string;
  Location_Code: string;
  Gen_Prod_Posting_Group: string;
  Quantity: number;
  Unit_Amount: number;
  Amount: number;
  Unit_Cost: number;
  Reason_Code: NavReasonCode;
  Weight: number;
  Meta: number;
  Job_No: string;
}

export interface NavLocation {
  Code: string;
  Name: string;
}

export interface NavHealthStatus extends ICodeDescription {}

////////////
// ENUMS //
////////////

export enum NavItemJournalTemplate {
  Mortality = "MORTALITY",
  Adjustment = "QTYADJ",
  GradeOff = "GRADEOFF",
  Move = "MOVE",
  Wean = "WEAN",
  Purchase = "PURCHASE",
  Shipment = "SHIPMENT",
  Inventory = "INVENTORY",
}

export enum NavEntryType {
  Positive = "Positive Adjmt.",
  Negative = "Negative Adjmt.",
}

export enum NavReasonCode {
  NaturalDeath = "DEAD-NAT",
  Euthanized = "DEAD-EUTH",
  GradeOffLame = "GRLAME",
  GradeOffRespitory = "GRRESP",
  GradeOffBellyRupture = "GRBRUPT",
  GradeOffScrotumRupture = "GRSRUPT",
  GradeOffScours = "GRSCOURS",
  GradeOffSmall = "GRSMALL",
  GradeOffUnthrifty = "GRUNTHRIFT",
}

//TODO - does this need to be here or just on post?
export enum NavItemJournalBatch {
  FarmApp = "FARMAPP",
}

export enum NavItemJournalTemplate {
  Mortality = "MORTALITY",
  Adjustment = "QTYADJ",
  GradeOff = "GRADEOFF",
  Move = "MOVE",
  Wean = "WEAN",
  Purchase = "PURCHASE",
  Shipment = "SHIPMENT",
  Inventory = "INVENTORY",
}
