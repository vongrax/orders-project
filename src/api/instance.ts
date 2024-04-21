import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default abstract class InstanceHttpClient {
  readonly instance: AxiosInstance;

  public constructor(parameter: string) {
    const API_STRING = `https://dev-su.eda1.ru/test_task/${parameter}`;
    this.instance = axios.create({
      baseURL: API_STRING,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async apiCall<T>(config: AxiosRequestConfig) {
    try {
      const { data } = await this.instance.request<T>(config);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
