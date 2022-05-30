import { Injectable } from '@nestjs/common';
import { ID } from '../types/types';
import { ApiService } from '../api/api.service';
import { UserDto } from '../dtos/UserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccess, UserMeta, Users } from '../typeorm';
import { Repository } from 'typeorm';
import { UserDtoMeta } from '../dtos/UserDtoMeta';

@Injectable()
export class UsersService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UserMeta) private userMetaRepo: Repository<UserMeta>,
    @InjectRepository(UserAccess)
    private userAccessRepo: Repository<UserAccess>,
  ) {}

  async getUsersData(): Promise<UserDtoMeta[]> {
    const users: Users[] = await this.usersRepo.find({
      relations: ['userMeta', 'userAccess'],
    });

    return users.map((user) => new UserDtoMeta(user));
  }

  async getUserData(id: ID) {
    return this.apiService.get<UserDto>(`user`, { id });
  }
}
