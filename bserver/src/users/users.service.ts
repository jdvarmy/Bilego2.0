import { Injectable } from '@nestjs/common';
import { LoginUser, RegisterUser } from '../types/userTypes';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { Id, WPError } from '../types/types';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getUser(data: LoginUser): Promise<Observable<Id | WPError>> {
    return this.httpService
      .post(`${process.env.BILEGO_API_SERVER}/auth/login`, data)
      .pipe(map((response: AxiosResponse<Id | WPError>) => response.data));
  }

  async registerUser(data: RegisterUser): Promise<Observable<Id | WPError>> {
    return this.httpService
      .post(`${process.env.BILEGO_API_SERVER}/auth/register`, data)
      .pipe(map((response: AxiosResponse<Id | WPError>) => response.data));
  }
}
