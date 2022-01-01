import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUser, RegisterUser } from 'src/types/userTypes';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs';
import { checkErrorResponse } from '../utils';

export const accessTokenName = 'access_token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUser) {
    const user = await this.usersService.getUser({ email, password });

    return user.pipe(
      map((response) => {
        if (checkErrorResponse(response)) {
          throw new UnauthorizedException({
            code: 'login_user',
            message: 'Извините, пользователь не найден',
            data: { status: false, code: 401 },
          });
        }

        return { access_token: this.jwtService.sign({ id: response }) };
      }),
    );
  }

  async register(data: RegisterUser) {
    const user = await this.usersService.registerUser(data);

    return user.pipe(
      map((response) => {
        if (typeof response === 'object' && checkErrorResponse(response)) {
          const defaultException = {
            code: 'register_user',
            message:
              'Извините, регистрация не удалась, попробуйте повторить позже',
            data: { status: false, code: 401 },
          };

          switch (response.code) {
            case 'existing_user_login':
              throw new UnauthorizedException({
                ...defaultException,
                message:
                  'Извините, этот email пользователя уже зарегистрирован!',
              });
            case 'user_login_too_long':
              throw new UnauthorizedException({
                ...defaultException,
                message: 'Извините, email не может быть длинее 60 символов',
              });
            default:
              throw new UnauthorizedException(defaultException);
          }
        }

        return { access_token: this.jwtService.sign({ id: response }) };
      }),
    );
  }
}
