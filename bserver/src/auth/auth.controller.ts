import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieTokenName, UserTokens } from '../types/types';
import { Request, Response } from 'express';
import { ReqRegisterUserDto } from '../dtos/ReqRegisterUserDto';
import { ReqLoginUserDto } from '../dtos/ReqLoginUserDto';
import { AuthHttpExceptionFilter } from './auth-http-exception.filter';
import { setCookieRefreshToken } from '../utils';
import { IpDecorator } from '../decorators/ip.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('v1/auth/register')
  @UseFilters(new AuthHttpExceptionFilter())
  public async register(
    @Body() registerDto: ReqRegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Omit<UserTokens, 'refreshToken'>> {
    const { refreshToken, ...data } = await this.authService.register({
      ...registerDto,
    });

    setCookieRefreshToken(response, refreshToken);

    return data;
  }

  @Post('v1/auth/login')
  @UseFilters(new AuthHttpExceptionFilter())
  public async login(
    @Body() loginDto: ReqLoginUserDto,
    @Res({ passthrough: true }) response: Response,
    @IpDecorator() userIp,
  ): Promise<Omit<UserTokens, 'refreshToken'>> {
    const { refreshToken, ...data } = await this.authService.login({
      ...loginDto,
      ip: userIp,
    });

    setCookieRefreshToken(response, refreshToken);

    return data;
  }

  @Post('v1/auth/logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<boolean> {
    const { refreshToken } = req.cookies;
    const response = await this.authService.logout(refreshToken);
    res.clearCookie(CookieTokenName);

    return response;
  }

  @Get('v1/auth/refresh')
  public async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Omit<UserTokens, 'refreshToken'>> {
    const { refreshToken } = req.cookies;

    const { refreshToken: refresh, ...data } = await this.authService.refresh(
      refreshToken,
    );

    setCookieRefreshToken(response, refresh);

    return data;
  }
}
