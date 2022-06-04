import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ID } from '../types/types';
import { ApiService } from '../api/api.service';
import { UserDto } from '../dtos/UserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Media, UserAccess, UserMeta, Users } from '../typeorm';
import { Repository } from 'typeorm';
import { UserDtoMeta } from '../dtos/UserDtoMeta';
import { ReqSaveUserDto } from '../dtos/ReqSaveUserDto';
import { InternalServerErrorException_500 } from '../types/enums';
import * as bcrypt from 'bcrypt';
import { v4 as uidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Media) private mediaRepo: Repository<Media>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UserMeta) private userMetaRepo: Repository<UserMeta>,
    @InjectRepository(UserAccess)
    private userAccessRepo: Repository<UserAccess>,
  ) {}

  async getUsersData(): Promise<UserDtoMeta[]> {
    const users: Users[] = await this.usersRepo.find({
      relations: ['userMeta', 'userAccess'],
      order: { id: 'DESC' },
    });

    return users.map((user) => new UserDtoMeta(user));
  }

  async getUserData(id: ID) {
    return this.apiService.get<UserDto>(`user`, { id });
  }

  async saveUserData(data: ReqSaveUserDto): Promise<boolean> {
    const {
      email,
      password,
      name,
      surname,
      status,
      role,
      birthdate,
      avatar,
      phone,
      sendMail,
      concertManagerInfo,
      concertManagerPercentage,
    } = data;
    if (!email || !password) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.saveUser,
      );
    }

    const user = this.usersRepo.create({
      uid: uidv4(),
      email,
      login: email,
      pass: await bcrypt.hash(password, 13),
      role,
      status,
    });
    await this.usersRepo.save(user);

    const userAvatar = await this.mediaRepo.findOne({ where: { id: avatar } });

    const userMeta = this.userMetaRepo.create({
      name,
      surname,
      birthdate,
      phone,
      concertManagerInfo,
      concertManagerPercentage,
    });
    userMeta.user = user;
    if (userAvatar) {
      userMeta.avatar = userAvatar;
    }
    await this.userMetaRepo.save(userMeta);

    return true;
  }

  async deleteUserData(uid: string): Promise<boolean> {
    const user = await this.usersRepo.findOne({ where: { uid } });
    await this.usersRepo.remove(user);

    return true;
  }
}
