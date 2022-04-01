import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUser, RegisterUser, User, UserTokens } from 'src/types/types';
import { checkWPErrorResponse } from '../utils';
import { ApiService } from '../api/api.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly apiService: ApiService,
    private readonly tokensService: TokensService,
  ) {}

  async register(data: RegisterUser): Promise<UserTokens> {
    const { ip, ...userData } = data;

    const user = await this.apiService.post<User>(`auth/register`, userData);
    checkWPErrorResponse(user);

    const tokens = this.tokensService.generateTokens(user);
    const props = { ip };

    await this.tokensService.saveToken(user.id, tokens.refreshToken, props);

    return { user, ...tokens };
  }

  async login(data: LoginUser): Promise<UserTokens> {
    const { ip, ...userData } = data;

    const user = await this.apiService.post<User>(`auth/login`, userData);
    checkWPErrorResponse(user);

    const tokens = this.tokensService.generateTokens(user);
    const props = { ip };

    await this.tokensService.saveToken(user.id, tokens.refreshToken, props);

    return { user, ...tokens };
  }

  async logout(refreshToken: string): Promise<boolean> {
    return this.tokensService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string, ip: string): Promise<any> {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const user = this.tokensService.verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    );
    const userIdFromBd = await this.tokensService.findToken(refreshToken);

    if (!user || !userIdFromBd.id) {
      throw new UnauthorizedException();
    }

    const tokens = this.tokensService.generateTokens(userIdFromBd);
    const props = { ip };

    await this.tokensService.saveToken(
      userIdFromBd.id,
      tokens.refreshToken,
      props,
    );

    return { user: userIdFromBd, ...tokens };
  }
}
