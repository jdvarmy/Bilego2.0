import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    return this.userService.getUserData(req.user.id);
  }
}
