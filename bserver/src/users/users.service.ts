import { Injectable } from '@nestjs/common';
import { IUser } from '../types';

@Injectable()
export class UsersService {
  private readonly users: IUser[];

  constructor() {
    this.users = [
      {
        userId: 1,
        name: 'john',
        username: 'john',
        password: 'ccc',
      },
      {
        userId: 2,
        name: 'chris',
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        name: 'maria',
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(name: string): Promise<IUser | undefined> {
    return this.users.find((user) => user.name === name);
  }
}
