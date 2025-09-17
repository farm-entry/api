export interface NavConfig {
  baseUrl: string;
  username: string;
  password: string;
}

export interface NavODataOptions {
  filter?: string;
  select?: string;
  orderby?: string;
  top?: number;
  skip?: number;
}

const createHeaders = (username: string, password: string): HeadersInit => {
  const credentials = btoa(`${username}:${password}`);
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Basic ${credentials}`,
    'OData-Version': '4.0',
    'OData-MaxVersion': '4.0'
  };
};

const buildUrl = (baseUrl: string, endpoint: string, options?: NavODataOptions): string => {
  let url = `${baseUrl}/${endpoint}`;

  if (options) {
    const queryParams = new URLSearchParams();

    if (options.filter) queryParams.append('$filter', options.filter);
    if (options.select) queryParams.append('$select', options.select);
    if (options.orderby) queryParams.append('$orderby', options.orderby);
    if (options.top) queryParams.append('$top', options.top.toString());
    if (options.skip) queryParams.append('$skip', options.skip.toString());

    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return url;
};

export async function navGet<T>(
  config: NavConfig,
  endpoint: string,
  options?: NavODataOptions
): Promise<T> {
  try {
    const url = buildUrl(config.baseUrl, endpoint, options);
    console.log('baseUrl =', config.baseUrl);
    console.log('url =', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: createHeaders(config.username, config.password)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nav OData error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from Nav OData:', error);
    throw error;
  }
}

export async function navPost<T>(
  config: NavConfig,
  endpoint: string,
  data: any
): Promise<T> {
  try {
    const url = `${config.baseUrl}/${endpoint}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: createHeaders(config.username, config.password),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nav OData error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error posting to Nav OData:', error);
    throw error;
  }
}

export async function navPatch<T>(
  config: NavConfig,
  endpoint: string,
  data: any
): Promise<T> {
  try {
    const url = `${config.baseUrl}/${endpoint}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...createHeaders(config.username, config.password),
        'If-Match': '*' // Often required for PATCH operations in Nav
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nav OData error! status: ${response.status}, message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error patching Nav OData:', error);
    throw error;
  }
}

export async function navDelete(
  config: NavConfig,
  endpoint: string
): Promise<void> {
  try {
    const url = `${config.baseUrl}/${endpoint}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...createHeaders(config.username, config.password),
        'If-Match': '*'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Nav OData error! status: ${response.status}, message: ${errorText}`);
    }
  } catch (error) {
    console.error('Error deleting from Nav OData:', error);
    throw error;
  }
}

export function createNavConfig(): NavConfig {
  const baseUrl = process.env.NAV_BASE_URL;
  const username = process.env.NAV_USER;
  const password = process.env.NAV_ACCESS_KEY;

  if (!baseUrl || !username || !password) {
    throw new Error('Nav configuration missing from environment variables');
  }

  return { baseUrl, username, password };
}
