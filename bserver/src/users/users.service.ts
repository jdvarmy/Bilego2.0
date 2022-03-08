import { Injectable } from '@nestjs/common';
import { Id, User } from '../types/types';
import { ApiService } from '../api/api.service';

@Injectable()
export class UsersService {
  constructor(private readonly apiService: ApiService) {}

  async getUserData(id: Id) {
    return this.apiService.get<User>(`user`, { id });
  }
}
