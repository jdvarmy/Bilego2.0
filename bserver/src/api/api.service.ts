import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { WPError } from '../types/types';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as qs from 'qs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(
    url: string,
    options?: any,
    config?: AxiosRequestConfig,
  ): Promise<Observable<T | WPError>> {
    let fullUrl = `${process.env.BILEGO_API_SERVER}/${url}`;

    if (options) {
      fullUrl += qs.stringify(options, { addQueryPrefix: true });
    }

    return this.httpService
      .get(fullUrl, config)
      .pipe(map((response: AxiosResponse<T | WPError>) => response.data));
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<Observable<T | WPError>> {
    return this.httpService
      .post(`${process.env.BILEGO_API_SERVER}/${url}`, data, config)
      .pipe(map((response: AxiosResponse<T | WPError>) => response.data));
  }
}
