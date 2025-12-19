import { ICodeDescription } from "./types.js";
import {
  NavEntryType,
  NavReasonCode,
  NavItemJournalTemplate,
  NavItemJournalBatch,
} from "./enum.js";

export interface NavCodeDescription {
  Code: string;
  Description: string;
}

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

export interface NavInventory {
  Job_No: string;
  StartQty: number;
  StartValue: number;
  AuxiliaryIndex1: string;
}

export interface NavHealthStatus extends NavCodeDescription { }
export interface NavReason extends NavCodeDescription { }
