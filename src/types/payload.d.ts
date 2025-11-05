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
  projectManager?: NavUser;
  status: string;
  startQuantity: number;
  postingGroup: string;
  //healthStatus: IHealthStatus;
}

export interface IResource {
  number: string!;
  name: string!;
  unitPrice: number;
}

export interface ILocation extends ICodeDescription {}

export interface IUser {
  userName: string!;
  name: string;
}

export interface IHealthStatus extends ICodeDescription {
  color: string;
}
