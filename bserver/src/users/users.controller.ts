import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessJwtAuthGuard } from '../jwt/access-jwt-auth-guard.service';
import { UsersService } from './users.service';
import { UserDtoMeta } from '../dtos/UserDtoMeta';
import { ReqSaveUserDto } from '../dtos/ReqSaveUserDto';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AccessJwtAuthGuard)
  public async getUsers(@Req() req): Promise<UserDtoMeta[]> {
    try {
      return this.usersService.getUsersData();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  // todo: refactor
  @Get(':uid')
  @UseGuards(AccessJwtAuthGuard)
  public async getUser(@Req() req): Promise<any> {
    return this.usersService.getUserData(req.user?.id);
  }

  @Post('save')
  @UseGuards(AccessJwtAuthGuard)
  public async saveUser(@Body() userDto: ReqSaveUserDto): Promise<boolean> {
    try {
      return this.usersService.saveUserData(userDto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Delete(':uid')
  @UseGuards(AccessJwtAuthGuard)
  public async removeUser(@Param('uid') uid: string): Promise<boolean> {
    try {
      return this.usersService.deleteUserData(uid);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
