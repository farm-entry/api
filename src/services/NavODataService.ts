//very TBD

export class NavODataService {
  private baseUrl: string;
  private username: string;
  private password: string;

  constructor(baseUrl: string, username: string, password: string) {
    this.baseUrl = baseUrl;
    this.username = username;
    this.password = password;
  }

  private getHeaders(): HeadersInit {
    const credentials = btoa(`${this.username}:${this.password}`);

    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`,
      'OData-Version': '4.0',
      'OData-MaxVersion': '4.0'
    };
  }

  async get<T>(endpoint: string, filter?: string): Promise<T> {
    try {
      let url = `${this.baseUrl}/${endpoint}`;
      console.log('baseUrl = ', this.baseUrl);
      console.log('url = ', url);
      if (filter) {
        url += `?$filter=${encodeURIComponent(filter)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Nav OData error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching from Nav OData:', error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Nav OData error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error posting to Nav OData:', error);
      throw error;
    }
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'PATCH',
        headers: {
          ...this.getHeaders(),
          'If-Match': '*' // Often required for PATCH operations in Nav
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Nav OData error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error patching Nav OData:', error);
      throw error;
    }
  }
}
