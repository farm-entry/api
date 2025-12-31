import { NavHealthStatus, NavReason } from "../types/nav.js";
import { buildFilter, navGet } from "./NavConfig.js";

export const getHealthStatus = async (
  status: string
): Promise<NavHealthStatus | undefined> => {
  return status.length > 0 ? navGet(`HealthStatus('${status}')`) : undefined;
};

export const getAllHealthStatuses = async (): Promise<NavHealthStatus[]> => {
  return await navGet("/HealthStatus");
};

export const getReasonCodeDescList = async (
  codes: string[]
): Promise<NavReason[]> => {
  return await navGet(
    `/ReasonCodes?$filter=${buildFilter((f) =>
      f.or(...codes.map((code) => f.equals("Code", code)))
    )}`
  );
};
