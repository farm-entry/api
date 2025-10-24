import { navGet } from "./navConfig.js";

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

export const getLivestockJobs = async (): Promise<NavJob[]> => {
  return await navGet("JobsLivestock");
};
