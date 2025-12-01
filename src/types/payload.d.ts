import { NavResource } from "./nav.js";
import { ICodeDescription } from "./types.js";

export interface IJob {
  number: string;
  description: string;
  personResponsible?: NavResource;
  inventory: number;
  deadQuantity: number;
  startDate: string;
  endDate: string;
  // groupStartDate: string;
  location?: NavLocation;
  projectManager?: NavUser; //TODO: use IUser interface and omit security-sensitive field
  status: string;
  startQuantity: number;
  postingGroup: string;
  healthStatus?: NavHealthStatus;
}
