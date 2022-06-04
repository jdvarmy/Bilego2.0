import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ReqRegisterUserDto } from './ReqRegisterUserDto';
import { UserEntityRole } from '../types/enums';

export class ReqSaveUserDto extends ReqRegisterUserDto {
  @IsNotEmpty({ message: 'Не заполнен статус, хорошо бы заполнить' })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  status?: number;

  @IsOptional()
  @IsString()
  role?: UserEntityRole;

  @IsOptional()
  @IsBoolean()
  sendMail?: boolean;

  @IsOptional()
  @IsNumber()
  avatar?: number;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  concertManagerInfo?: string;

  @IsOptional()
  @IsNumber()
  concertManagerPercentage?: number;
}
