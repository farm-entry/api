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
  Person_Responsible: string; //person object
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

export interface NavLocation {}
