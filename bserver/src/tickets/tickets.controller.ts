import { Controller, Get, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  getEventTickets(@Query('id') id?: number, @Query('slug') slug?: string) {
    if (!id && !slug) {
      // todo: добавить обработчик ошибок
      return 'no params';
    }

    return this.ticketsService.getEventTickets({ id, slug });
  }
}
