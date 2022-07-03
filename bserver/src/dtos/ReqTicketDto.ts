import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketType } from '../types/enums';
import { TicketSellDto } from './TicketSellDto';

export class ReqTicketDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsOptional()
  @IsString()
  type?: TicketType;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsArray()
  @ArrayMinSize(1)
  // @Type(() => TicketSell)
  sell: TicketSellDto[];
}
