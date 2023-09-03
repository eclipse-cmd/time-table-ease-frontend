import { _BASE_API_URL, _TOKEN_NAME_ } from '@/constants';
import type {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import axios from 'axios';
import { now } from 'moment';
import { getLocalStorage } from '../utils';

type ErrorCause = {
  status: boolean;
  message?: string;
  stackTrace?: string;
};

type ErrorStack = {
  config: object;
  data: ErrorCause;
  headers: object;
  request: object;
  status: number;
  statusText: string;
};

interface ResponseData<T> {
  response?: T | null;
  error?: {
    cause?: ErrorCause;
    stack: ErrorStack;
  } & Error;
}

export interface ResponseMeta<T> {
  success: boolean;
  data: T;
}

export const axiosClient: AxiosInstance = axios.create({
  baseURL: _BASE_API_URL,
  headers: {
    Authorization: `Bearer ${getLocalStorage(_TOKEN_NAME_)}`,
    Accept: 'application/json',
  },
});

export class ApiService {
  /**
   * @description initialize axios headers
   */
  public static init() {
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.baseURL = _BASE_API_URL as string;
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @returns Promise<RequestResponse>
   */
  public static async get<T>(
    resource: string,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    try {
      const response: AxiosResponse<T> = await axios.get<T>(resource, this.getAxioConfig(headers, config));
      return { response: response.data };
    } catch (error: any) {
      const errorResponse = error.response;
      const errorMessage = errorResponse?.data?.message || 'There was an error processing this request';

      return {
        error: { name: error.name, message: errorMessage, cause: errorResponse.data, stack: errorResponse },
      };
    }
  }

  /**
   * @description send the POST HTTP request
   * @param resource: string
   * @param payload: object
   * @returns Promise<RequestResponse>
   */
  public static async post<T>(
    resource: string,
    payload: unknown,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    try {
      const response: AxiosResponse<T> = await axios.post<T>(
        resource,
        payload,
        this.getAxioConfig(headers, config)
      );
      return { response: response.data };
    } catch (error: any) {
      const errorResponse = error.response;
      const errorMessage = errorResponse?.data?.message || 'There was an error processing this request';

      return {
        error: { name: error.name, message: errorMessage, cause: errorResponse.data, stack: errorResponse },
      };
    }
  }

  /**
   * @description send the PUT HTTP request
   * @param resource: string
   * @param payload: object
   * @returns Promise<RequestResponse>
   */
  public static async put<T>(
    resource: string,
    payload: unknown,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    try {
      const response: AxiosResponse<T> = await axios.put<T>(
        resource,
        payload,
        this.getAxioConfig(headers, config)
      );
      return { response: response.data };
    } catch (error: any) {
      const errorResponse = error.response;
      const errorMessage = errorResponse?.data?.message || 'There was an error processing this request';

      return {
        error: { name: error.name, message: errorMessage, cause: errorResponse.data, stack: errorResponse },
      };
    }
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @returns Promise<RequestResponse>
   */
  public static async delete<T>(
    resource: string,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    try {
      const response: AxiosResponse<T> = await axios.delete<T>(resource, this.getAxioConfig(headers, config));
      return { response: response.data };
    } catch (error: any) {
      const errorResponse = error.response;
      const errorMessage = errorResponse?.data?.message || 'There was an error processing this request';

      return {
        error: { name: error.name, message: errorMessage, cause: errorResponse.data, stack: errorResponse },
      };
    }
  }

  /**
   * @description download assets from server
   * @param path: string
   * @param customFileName: string
   * @returns Promise<void>
   */
  public static async download(path: string, customFileName = `${now()}_timetable.pdf`): Promise<void> {
    const downloadConfig = {
      headers: {
        Authorization: `Bearer ${getLocalStorage(_TOKEN_NAME_)}`,
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    };

    const response = await axiosClient.get(path, downloadConfig as AxiosRequestConfig);
    const fileName = response.headers['x-Filename'];

    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement('a');

    fileLink.href = fileURL;
    fileLink.setAttribute('download', fileName ?? customFileName);
    document.body.appendChild(fileLink);
    fileLink.click();
  }

  public static getAxioConfig(
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
    config?: AxiosRequestConfig
  ): AxiosRequestConfig {
    return {
      baseURL: _BASE_API_URL,
      headers: {
        'Access-Control-Allow-Credentials': true,
        Accept: 'application/json',
        Authorization: `Bearer ${getLocalStorage(_TOKEN_NAME_)}`,
        ...headers,
      } satisfies RawAxiosRequestHeaders | AxiosHeaders,
      ...config,
    } satisfies AxiosRequestConfig;
  }
}
