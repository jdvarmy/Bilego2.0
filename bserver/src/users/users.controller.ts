import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from '../jwt/access-jwt-auth-guard.service';
import { UsersService } from './users.service';
import { UserDtoMeta } from '../dtos/UserDtoMeta';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AccessJwtAuthGuard)
  public async getUsers(@Req() req): Promise<UserDtoMeta[]> {
    return this.usersService.getUsersData();
  }

  @Get('user')
  @UseGuards(AccessJwtAuthGuard)
  public async getUser(@Req() req): Promise<any> {
    return this.usersService.getUserData(req.user?.id);
  }
}
