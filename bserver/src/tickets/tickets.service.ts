import { Injectable } from '@nestjs/common';
import { ReqTicketDto } from '../dtos/ReqTicketDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tickets, TicketsSell } from '../typeorm';
import { Repository } from 'typeorm';
import { TicketDto } from '../dtos/TicketDto';
import { EventsService } from '../events/events.service';

@Injectable()
export class TicketsService {
  constructor(
    private readonly eventsService: EventsService,
    @InjectRepository(Tickets) private ticketsRepo: Repository<Tickets>,
    @InjectRepository(TicketsSell)
    private ticketsSellRepo: Repository<TicketsSell>,
  ) {}

  async getTickets(dateUid: string): Promise<TicketDto[]> {
    const eventDate = await this.eventsService.getEventDateByUid(dateUid);

    return (await this.getEventTicketsByDateId(eventDate.id)).map(
      (t) => new TicketDto(t),
    );
  }

  async saveTickets(
    dateUid: string,
    tickets: ReqTicketDto[],
  ): Promise<TicketDto[]> {
    const eventDate = await this.eventsService.getEventDateByUid(dateUid);

    for (const _ticket of tickets) {
      const { sell: _sell, ...t } = _ticket;

      const temporaryTicket = this.ticketsRepo.create({ ...t, eventDate });
      const ticket = await this.ticketsRepo.save(temporaryTicket);

      for (const s of _sell) {
        const temporarySell = this.ticketsSellRepo.create({ ...s, ticket });
        await this.ticketsSellRepo.save(temporarySell);
      }
    }

    return (await this.getEventTicketsByDateId(eventDate.id)).map(
      (t) => new TicketDto(t),
    );
  }

  // UTILS
  async getEventTicketsByDateId(id: number): Promise<Tickets[]> {
    const tickets = await this.ticketsRepo
      .createQueryBuilder('tickets')
      .leftJoinAndSelect('tickets.ticketsSell', 'sell')
      .where('tickets.eventDate = :eventDate', { eventDate: id })
      .orderBy('tickets.id', 'ASC')
      .getMany();

    if (!tickets) {
      return [] as Tickets[];
    }

    return tickets;
  }
}
