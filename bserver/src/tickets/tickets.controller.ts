import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ReqTicketDto } from '../dtos/ReqTicketDto';
import { AccessJwtAuthGuard } from '../jwt/access-jwt-auth-guard.service';
import { TicketDto } from '../dtos/TicketDto';

@Controller('v1/tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get(':eventDateUid')
  @UseGuards(AccessJwtAuthGuard)
  getTickets(
    @Param('eventDateUid') eventDateUid: string,
  ): Promise<TicketDto[]> {
    try {
      return this.ticketsService.getTickets(eventDateUid);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post(':eventDateUid')
  @UseGuards(AccessJwtAuthGuard)
  saveTickets(
    @Param('eventDateUid') eventDateUid: string,
    @Body() ticketsDto: ReqTicketDto[],
  ): Promise<TicketDto[]> {
    try {
      return this.ticketsService.saveTickets(eventDateUid, ticketsDto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
