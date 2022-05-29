import { Injectable } from '@nestjs/common';
import { ID } from '../types/types';
import { ApiService } from '../api/api.service';
import { UserDto } from '../dtos/UserDto';

@Injectable()
export class UsersService {
  constructor(private readonly apiService: ApiService) {}

  async getUserData(id: ID) {
    return this.apiService.get<UserDto>(`user`, { id });
  }
}
