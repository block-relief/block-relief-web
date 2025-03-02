import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import config from "../config";

export interface ApiResponse<T> {
  result: T | null;
  error: Error | null;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.instance = axiosInstance;

    this.instance.interceptors.request.use((cfg) => {
      cfg.withCredentials = true;
      return cfg;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          setReturnTo();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T = unknown>(
    url: string,
    query?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url, {
        params: query,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error((response.data as string) || "An error occurred");
      }
      return { result: response.data, error: null };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T = unknown, D = unknown>(
    url: string,
    data: D,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(url, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("An error occurred");
      }
      return { result: response.data, error: null };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T = unknown, D = unknown>(
    url: string,
    data: D,
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(url, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("An error occurred");
      }
      return { result: response.data, error: null };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError<T>(error: unknown): ApiResponse<T> {
    return {
      result: null,
      error: this.resolveAxiosError(error),
    };
  }

  private resolveAxiosError(error: unknown, defaultMsg?: string): Error {
    const axiosError = error as AxiosError<{ error?: string; msg?: string }>;
    const message =
      axiosError?.response?.data?.error ??
      axiosError?.response?.data?.msg ??
      defaultMsg ??
      "An error occurred";
    return new Error(message);
  }
}

/**
 * Get the returnTo path from sessionStorage
 * @returns string | null
 * @note This function will remove the returnTo path from sessionStorage after reading it
 */
export const getReturnTo = (): string | null => {
  const returnTo = window.sessionStorage.getItem("returnTo");
  window.sessionStorage.removeItem("returnTo");
  return returnTo;
};

/**
 * Set the returnTo path in sessionStorage
 * @note When calling this function without any arguments, it will set the returnTo path to the current url path
 */
export const setReturnTo = (path = window.location.pathname) => {
  window.sessionStorage.setItem("returnTo", path);
};

const axiosInstance = axios.create({
  baseURL: config.apps.core,
  headers: {
    "x-client": config.client,
  },
  withCredentials: true,
});

export function getQueryStringFromUrl(url: string): string | null {
  const [_, query] = url.split("?");
  return query ?? null;
}

const Api = new ApiClient(axiosInstance);
export default Api;
