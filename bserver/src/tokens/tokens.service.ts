import { Injectable } from '@nestjs/common';
import { Id, User } from '../types/types';
import { ApiService } from '../api/api.service';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_ACCESS_EXPIRES,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES,
  JWT_REFRESH_SECRET,
} from '../constants/env';

@Injectable()
export class TokensService {
  constructor(
    private readonly apiService: ApiService,
    private readonly jwtService: JwtService,
  ) {}

  async saveToken(userId: Id, token: string, props?: any) {
    return this.apiService.post<boolean | number>(`user/token/save`, {
      id: userId,
      token,
      props,
    });
  }

  async findToken(token: string) {
    return this.apiService.get<User>(`user/token/find`, { token });
  }

  async removeToken(token: string): Promise<boolean> {
    await this.apiService.post<void>(`auth/logout`, { token });

    return true;
  }

  generateTokens(payload: User): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: JWT_ACCESS_SECRET,
        expiresIn: JWT_ACCESS_EXPIRES,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: JWT_REFRESH_SECRET,
        expiresIn: JWT_REFRESH_EXPIRES,
      }),
    };
  }

  verifyToken(token: string, secret: string) {
    try {
      return this.jwtService.verify(token, {
        secret,
      });
    } catch (e) {
      return null;
    }
  }
}
