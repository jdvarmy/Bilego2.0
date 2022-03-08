import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PostLoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
