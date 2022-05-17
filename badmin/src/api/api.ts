import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as qs from 'qs';
import { axiosBaseURL } from '../typings/env';

const baseConfig = {
  baseURL: axiosBaseURL,
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

const baseRequest = <R>({ method, url, ...config }: AxiosRequestConfig): Promise<AxiosResponse<R>> =>
  instance({ method, url, ...config });

const requests = {
  get: <R>(url: string, data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({
      method: RequestMethod.Get,
      url: data ? `${url}${qs.stringify(data, { addQueryPrefix: true })}` : url,
      ...cfg,
    }),

  post: <R>(url: string, data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Post, url, data, ...cfg }),

  put: <R>(url: string, data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Put, url, data, ...cfg }),

  patch: <R>(url: string, _data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Patch, url, ...cfg }),

  delete: <R>(url: string, _data?: any, cfg?: AxiosRequestConfig) =>
    baseRequest<R>({ method: RequestMethod.Delete, url, ...cfg }),
};

export default requests;
