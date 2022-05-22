import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AccessJwtAuthGuard } from '../jwt/access-jwt-auth-guard.service';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AccessJwtAuthGuard)
  public async getUser(@Req() req): Promise<any> {
    return this.usersService.getUserData(req.user?.id);
  }
}
