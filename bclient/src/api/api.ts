import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { storageTokenName } from '../types/types';

export const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_NEST_APP_API_ROOT,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(baseConfig);

instance.interceptors.request.use((request) => {
  if (request.headers) {
    request.headers.Authorization = `Bearer ${localStorage.getItem(storageTokenName)}`;
  }

  return request;
});
instance.interceptors.response.use(
  (request) => request,
  (error) => {
    const originalRequest = error.config;

    try {
      if ([401, 403].includes(error.response.status && error.config && !error.config._isRetry)) {
        originalRequest._isRetry = true;
        console.log(error.response.data);
      }
    } catch (e) {
      // todo:  сделать стор для ошибок авторизации и их визуализировать
    }
  },
);

enum RequestMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

const baseRequest = <R>({ method, url, ...config }: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
  instance({ method, url, ...config });

export default {
  get: <R>(url: string, params?: AxiosRequestConfig, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Get, url, params, ...cfg }),

  post: <R>(url: string, data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Post, url, data, ...cfg }),

  put: <R>(url: string, data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Put, url, data, ...cfg }),

  patch: <R>(url: string, _data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Patch, url, ...cfg }),

  delete: <R>(url: string, _data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Delete, url, ...cfg }),
};
