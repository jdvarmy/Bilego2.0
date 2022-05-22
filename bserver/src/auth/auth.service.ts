import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUser, RegisterUser, User, UserTokens } from 'src/types/types';
import { checkWPErrorResponse } from '../utils';
import { ApiService } from '../api/api.service';
import { TokensService } from '../tokens/tokens.service';
import { JWT_REFRESH_SECRET } from '../constants/env';

@Injectable()
export class AuthService {
  constructor(
    private readonly apiService: ApiService,
    private readonly tokensService: TokensService,
  ) {}

  async register(data: RegisterUser): Promise<UserTokens> {
    const user = await this.apiService.post<User>(`auth/register`, data);
    checkWPErrorResponse(user);

    const tokens = this.tokensService.generateTokens(user);

    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async login(data: LoginUser): Promise<UserTokens> {
    const user = await this.apiService.post<User>(`auth/login`, data);
    checkWPErrorResponse(user);

    const tokens = this.tokensService.generateTokens(user);

    await this.tokensService.saveToken(user.id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async logout(refreshToken: string): Promise<boolean> {
    return this.tokensService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string): Promise<UserTokens> {
    if (!refreshToken || refreshToken === 'undefined') {
      throw new UnauthorizedException();
    }

    const user = this.tokensService.verifyToken(
      refreshToken,
      JWT_REFRESH_SECRET,
    );
    const userIdFromBd = await this.tokensService.findToken(refreshToken);

    if (!user || !userIdFromBd.id) {
      throw new UnauthorizedException();
    }

    const tokens = this.tokensService.generateTokens(userIdFromBd);

    await this.tokensService.saveToken(userIdFromBd.id, tokens.refreshToken);

    return { user: userIdFromBd, ...tokens };
  }
}
