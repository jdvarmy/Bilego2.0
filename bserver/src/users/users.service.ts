import { Injectable } from '@nestjs/common';
import { User, LoginUser, RegisterUser } from '../types/userTypes';
import { Id } from '../types/types';
import { ApiService } from '../api/api.service';

@Injectable()
export class UsersService {
  constructor(private readonly apiService: ApiService) {}

  async getUser(data: LoginUser) {
    return this.apiService.post<Id>(`auth/login`, data);
  }

  async registerUser(data: RegisterUser) {
    return this.apiService.post<Id>(`auth/register`, data);
  }

  async getUserData(id: Id) {
    return this.apiService.get<User>(`user?id=${id}`);
  }
}
