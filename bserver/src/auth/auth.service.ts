import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUser, RegisterUser, UserTokens } from 'src/types/types';
import { checkWPErrorResponse } from '../utils';
import { ApiService } from '../api/api.service';
import { TokensService } from '../tokens/tokens.service';
import { JWT_REFRESH_SECRET } from '../constants/env';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException_401, UserEntityDeleted } from '../types/enums';
import { UserDto } from '../dtos/UserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly apiService: ApiService,
    private readonly tokensService: TokensService,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
  ) {}

  // todo: refactor
  async register(data: RegisterUser): Promise<UserTokens> {
    const user = await this.apiService.post<UserDto>(`auth/register`, data);
    checkWPErrorResponse(user);

    const tokens = this.tokensService.generateTokens(user);

    // await this.tokensService.saveToken(user.uid, tokens.refreshToken);

    return { user, ...tokens };
  }

  async login(data: LoginUser): Promise<UserTokens> {
    const { email, password } = data;
    const user: Users = await this.usersRepo.findOne({
      where: { login: email, deleted: UserEntityDeleted.false },
      relations: ['userMeta'],
    });

    if (!user) {
      throw new UnauthorizedException(UnauthorizedException_401.notFound);
    }

    if (!(await bcrypt.compare(password, user.pass))) {
      throw new UnauthorizedException(UnauthorizedException_401.wrongPass);
    }

    const userDto = new UserDto(user);
    const tokens = this.tokensService.generateTokens({ ...userDto });
    await this.tokensService.saveToken(user, tokens.refreshToken, {
      ip: data.ip,
    });

    return { user: { ...userDto }, ...tokens };
  }

  // todo: refactor
  async logout(refreshToken: string): Promise<boolean> {
    return this.tokensService.removeToken(refreshToken);
  }

  // todo: refactor
  async refresh(refreshToken: string): Promise<UserTokens> {
    if (!refreshToken || refreshToken === 'undefined') {
      throw new ForbiddenException();
    }

    const user = this.tokensService.verifyToken(
      refreshToken,
      JWT_REFRESH_SECRET,
    );
    const userIdFromBd = await this.tokensService.findToken(refreshToken);

    if (!user || !userIdFromBd.uid) {
      throw new ForbiddenException();
    }

    const tokens = this.tokensService.generateTokens(userIdFromBd);

    // await this.tokensService.saveToken(userIdFromBd.uid, tokens.refreshToken);

    return { user: userIdFromBd, ...tokens };
  }
}
