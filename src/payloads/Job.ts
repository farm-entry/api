import { getLocationByCode } from "../datasources/NavLocationDataSource.js";
import { getResourceByCode } from "../datasources/NavResourceDataSource.js";
import { NavJob, NavLocation, NavResource, NavUser } from "../types/nav.js";
import { IJob } from "../types/payload.js";
import { format, lastDayOfWeek } from "date-fns";
import { getDateFromWeekNumber } from "../utils/util.js";
import { getNavUserByName } from "../datasources/NavUserDataSource.js";

const DATE_FORMAT = "yyyy-MM-dd";

export class Job implements IJob {
  number: string;
  description: string;
  personResponsible?: NavResource;
  inventory: number;
  deadQuantity: number;
  startDate: string;
  endDate: string;
  //groupStartDate: string;
  location?: NavLocation;
  projectManager?: NavUser;
  status: string;
  startQuantity: number;
  postingGroup: string;
  //healthStatus: IHealthStatus;

  private constructor(
    data: NavJob,
    personResponsible?: NavResource,
    location?: NavLocation,
    projectManager?: NavUser
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
    // this.healthStatus = data.HealthStatus;
  }

  static async create(job: NavJob): Promise<Job> {
    const personResponsible: NavResource | undefined = await getResourceByCode(
      job.Person_Responsible
    );
    const location: NavLocation | undefined = await getLocationByCode(
      job.Location_Code
    );
    const projectManager: NavUser | undefined = await getNavUserByName(
      job.Project_Manager
    );

    return new Job(job, personResponsible, location, projectManager);
  }
}
