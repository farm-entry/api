import {
  BooleanFilterExpression,
  compileFilter,
  FilterFunction,
} from "../config/filter.js";
import { INavConfig } from "../types/types.js";

export interface NavODataOptions {
  filter?: string;
  select?: string;
  orderby?: string;
  top?: number;
  skip?: number;
}

const baseUrl = process.env.NAV_BASE_URL;
const username = process.env.NAV_USER;
const password = process.env.NAV_ACCESS_KEY;

const createHeaders = (username: string, password: string): HeadersInit => {
  const credentials = btoa(`${username}:${password}`);
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${credentials}`,
    "OData-Version": "4.0",
    "OData-MaxVersion": "4.0",
  };
};

const buildUrl = (endpoint: string, filter?: string): string => {
  let url = `${baseUrl}/${endpoint}`;
  if (filter) {
    url += `?$filter=${encodeURIComponent(filter)}`;
  }
  return url;
};

export const buildFilter: (fn: FilterFunction) => string = (fn) => {
  return compileFilter(fn);
};

export async function navGet<T>(endpoint: string, filter?: string): Promise<T> {
  try {
    if (!baseUrl || !username || !password) {
      throw new Error(
        "NAV environment variables NAV_BASE_URL, NAV_USER, or NAV_ACCESS_KEY are missing."
      );
    }
    let url = `${baseUrl}/${endpoint}`;
    if (filter) {
      url += `?$filter=${filter}`;
    }
    console.log("NAV GET URL:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(username, password),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Nav OData error! status: ${response.status}, message: ${errorText}`
      );
    }
    return await parseBody(response);
  } catch (error) {
    console.error("Error fetching from Nav OData:", error);
    throw error;
  }
}

export async function navPost<T>(endpoint: string, payload: any): Promise<T> {
  try {
    if (!baseUrl || !username || !password) {
      throw new Error(
        "NAV environment variables NAV_BASE_URL, NAV_USER, or NAV_ACCESS_KEY are missing."
      );
    }
    const url = `${baseUrl}/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: createHeaders(username, password),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Nav OData error! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting to Nav OData:", error);
    throw error;
  }
}

// Convert ODATA response to a more typical REST response and omit @odata.context.
const parseBody = async (response: Response) => {
  const data = (await response.json()) as any;

  const omitODataContext = (obj: any) => {
    if (obj && typeof obj === "object") {
      const { "@odata.context": _, ...rest } = obj;
      return rest;
    }
    return obj;
  };

  if (typeof data === "object" && Array.isArray(data.value)) {
    return data.value.map(omitODataContext);
  } else {
    return omitODataContext(data);
  }
};

// export async function navPatch<T>(
//   config: NavConfig,
//   endpoint: string,
//   data: any
// ): Promise<T> {
//   try {
//     const url = `${config.baseUrl}/${endpoint}`;

//     const response = await fetch(url, {
//       method: "PATCH",
//       headers: {
//         ...createHeaders(config.username, config.password),
//         "If-Match": "*", // Often required for PATCH operations in Nav
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Nav OData error! status: ${response.status}, message: ${errorText}`
//       );
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error patching Nav OData:", error);
//     throw error;
//   }
// }

// export async function navDelete(
//   config: NavConfig,
//   endpoint: string
// ): Promise<void> {
//   try {
//     const url = `${config.baseUrl}/${endpoint}`;

//     const response = await fetch(url, {
//       method: "DELETE",
//       headers: {
//         ...createHeaders(config.username, config.password),
//         "If-Match": "*",
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Nav OData error! status: ${response.status}, message: ${errorText}`
//       );
//     }
//   } catch (error) {
//     console.error("Error deleting from Nav OData:", error);
//     throw error;
//   }
// }

export function createNavConfig(): INavConfig {
  const baseUrl = process.env.NAV_BASE_URL;
  const username = process.env.NAV_USER;
  const password = process.env.NAV_ACCESS_KEY;

  if (!baseUrl || !username || !password) {
    throw new Error("Nav configuration missing from environment variables");
  }

  return { baseUrl, username, password };
}
