import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TicketType } from '../types/enums';

export class ReqEventDateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  type?: TicketType;

  @IsOptional()
  @IsString()
  dateFrom?: Date;

  @IsOptional()
  @IsString()
  dateTo?: Date;

  @IsOptional()
  @IsString()
  closeDateTime?: Date;
}
