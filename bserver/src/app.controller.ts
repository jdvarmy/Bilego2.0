import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginUser, RegisterUser, ReturnToken } from './types/userTypes';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  public async login(
    @Body() loginUser: LoginUser,
  ): Promise<Observable<ReturnToken>> {
    return this.authService.login(loginUser);
  }

  @Post('auth/register')
  public async register(
    @Body() registerUser: RegisterUser,
  ): Promise<Observable<ReturnToken>> {
    return this.authService.register(registerUser);
  }
}
