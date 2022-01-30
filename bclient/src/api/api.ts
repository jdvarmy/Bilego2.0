import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_ROOT,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(baseConfig);

enum RequestMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delete = 'delete',
}

const baseRequest = <R>({ method, url, ...config }: AxiosRequestConfig): Promise<AxiosResponse<R>> => {
  return instance({
    method,
    url,
    ...config,
  });
};

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
