import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, UserTokens } from '../types/types';
import { RealIP } from 'nestjs-real-ip';
import { Request, Response } from 'express';
import { PostRegisterUserDto } from '../dto/PostRegisterUserDto';
import { PostLoginUserDto } from '../dto/PostLoginUserDto';
import { AuthHttpRegisterExceptionFilter } from './auth-http-register-exception.filter';
import { AuthHttpLoginExceptionFilter } from './auth-http-login-exception.filter';
import { setCookieRefreshToken } from '../utils';
import { ETokens } from '../types/enums';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  @UseFilters(new AuthHttpRegisterExceptionFilter())
  public async register(
    @Body() registerDto: PostRegisterUserDto,
    @RealIP() ip: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Omit<UserTokens, 'refreshToken'>> {
    const { refreshToken, ...data } = await this.authService.register({
      ...registerDto,
      ip,
    });

    setCookieRefreshToken(response, refreshToken);

    return data;
  }

  @Post('auth/login')
  @UseFilters(new AuthHttpLoginExceptionFilter())
  public async login(
    @Body() loginDto: PostLoginUserDto,
    @RealIP() ip: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Omit<UserTokens, 'refreshToken'>> {
    const { refreshToken, ...data } = await this.authService.login({
      ...loginDto,
      ip,
    });

    setCookieRefreshToken(response, refreshToken);

    return data;
  }

  @Post('logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    const { refreshToken } = req.cookies;
    const response = await this.authService.logout(refreshToken);
    res.clearCookie(ETokens.refresh);

    return response;
  }

  @Get('refresh')
  public async refresh(
    @RealIP() ip: string,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const { refreshToken } = req.cookies;
    const { refreshToken: refresh, ...data } = await this.authService.refresh(
      refreshToken,
      ip,
    );

    setCookieRefreshToken(response, refresh);

    return data;
  }
}
