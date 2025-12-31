import { NavJob } from "../types/nav.js";
export class BaseJob {
  number: string;
  description: string;
  personResponsible: string;
  inventory: number;
  deadQuantity: number;
  startDate: string;
  endDate: string;
  location: string;
  projectManager: string;
  status: string;
  startQuantity: number;
  postingGroup: string;
  healthStatus: string;

  private constructor(data: NavJob) {
    this.number = data.No;
    this.description = data.Description;
    this.personResponsible = data.Person_Responsible;
    this.inventory = data.Inventory_Left;
    this.deadQuantity = data.Dead_Quantity;
    this.startDate = data.Starting_Date;
    this.endDate = data.Ending_Date;
    this.location = data.Location_Code;
    this.projectManager = data.Project_Manager;
    this.status = data.Status;
    this.startQuantity = data.Start_Quantity;
    this.postingGroup = data.Job_Posting_Group;
    this.healthStatus = data.HealthStatus;
  }

  static async create(job: NavJob): Promise<BaseJob> {
    return new BaseJob(job);
  }
}
