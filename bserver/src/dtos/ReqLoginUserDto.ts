import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReqLoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
