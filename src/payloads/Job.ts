import { getLocationByCode } from "../datasources/NavLocationDataSource.js";
import { getResourceByCode } from "../datasources/NavResourceDataSource.js";
import {
  NavHealthStatus,
  NavJob,
  NavLocation,
  NavResource,
  NavUser,
} from "../types/nav.js";
import { IJob } from "../types/payload.js";
import { getNavUserByName } from "../datasources/NavUserDataSource.js";
import { getHealthStatus } from "../datasources/NavMiscDataSource.js";

const DATE_FORMAT = "yyyy-MM-dd";

export class Job implements IJob {
  number: string;
  description: string;
  personResponsible?: NavResource;
  inventory: number;
  deadQuantity: number;
  startDate: string;
  endDate: string;
  //groupStartDate: string; //will be needed for scorecard (and mortality post)
  location?: NavLocation;
  projectManager?: NavUser;
  status: string;
  startQuantity: number;
  postingGroup: string;
  healthStatus?: NavHealthStatus;

  private constructor(
    data: NavJob,
    personResponsible?: NavResource,
    location?: NavLocation,
    projectManager?: NavUser,
    healthStatus?: NavHealthStatus
  ) {
    this.number = data.No;
    this.description = data.Description;
    this.personResponsible = personResponsible;
    this.inventory = data.Inventory_Left;
    this.deadQuantity = data.Dead_Quantity;
    this.startDate = data.Starting_Date;
    this.endDate = data.Ending_Date;
    // this.groupStartDate = (() => {
    //   const year = Number("20" + data.No.substring(0, 2));
    //   const week = Number(data.No.substring(2, 4));
    //   const date = getDateFromWeekNumber(week, year);
    //   const startDate = lastDayOfWeek(date, { weekStartsOn: 2 });
    //   const groupStartDate = format(startDate, DATE_FORMAT);
    //   return groupStartDate;
    // })();
    this.location = location;
    this.projectManager = projectManager;
    this.status = data.Status;
    this.startQuantity = data.Start_Quantity;
    this.postingGroup = data.Job_Posting_Group;
    this.healthStatus = healthStatus;
  }

  static async create(job: NavJob): Promise<Job> {
    const personResponsible: NavResource | undefined = await getResourceByCode(
      job.Person_Responsible
    ).catch(() => ({ Name: job.Person_Responsible } as NavResource));
    const location: NavLocation | undefined = await getLocationByCode(
      job.Location_Code
    ).catch(() => ({ Code: job.Location_Code } as NavLocation));
    const projectManager: NavUser | undefined = await getNavUserByName(
      job.Project_Manager
    ).catch(() => ({ User_Name: job.Project_Manager } as NavUser));
    const healthStatus: NavHealthStatus | undefined = await getHealthStatus(
      job.HealthStatus
    ).catch(() => ({ Code: job.HealthStatus } as NavHealthStatus));
    return new Job(
      job,
      personResponsible,
      location,
      projectManager,
      healthStatus
    );
  }
}
