import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReqTicketDto } from '../dtos/ReqTicketDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tickets, TicketsSell } from '../typeorm';
import { Repository } from 'typeorm';
import { TicketDto } from '../dtos/TicketDto';
import { EventsService } from '../events/events.service';
import { Exception500 } from '../types/enums';

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

      const repoTicket = this.ticketsRepo.create({ ...t, eventDate });
      const ticket = await this.ticketsRepo.save(repoTicket);

      for (const s of _sell) {
        const repoSell = this.ticketsSellRepo.create({ ...s, ticket });
        await this.ticketsSellRepo.save(repoSell);
      }
    }

    return (await this.getEventTicketsByDateId(eventDate.id)).map(
      (t) => new TicketDto(t),
    );
  }

  async editTickets(dateUid: string, tickets: ReqTicketDto[]): Promise<any[]> {
    const eventDate = await this.eventsService.getEventDateByUid(dateUid);

    for (const { sell: _sell, ...loopTicket } of tickets) {
      if (!loopTicket?.uid) {
        throw new InternalServerErrorException(Exception500.editNoTicketId);
      }

      const _ticketFromDb = await this.getTicketByUid(loopTicket.uid);
      if (!_ticketFromDb.uid) {
        throw new InternalServerErrorException(Exception500.editNoTicketId);
      }
      const { ticketsSell: sellFromDb, ...ticketFromDb } = _ticketFromDb;

      const repoTicket = this.ticketsRepo.create({ ...loopTicket });
      const ticket = await this.ticketsRepo.save({
        ...ticketFromDb,
        ...repoTicket,
      });

      for (const loopSell of _sell) {
        const localSellFromDb = sellFromDb.find(
          (_s) => _s.uid === loopSell.uid,
        );
        const repoSell = localSellFromDb
          ? // редактирование _sell
            this.ticketsSellRepo.create({ ...localSellFromDb, ...loopSell })
          : // добавление нового _sell
            this.ticketsSellRepo.create({ ...loopSell, ticket });

        await this.ticketsSellRepo.save(repoSell);
      }

      // удаление _sell
      const forDeleteSell = sellFromDb.filter(
        (sell) => !_sell.find((_s) => _s.uid === sell.uid),
      );
      for (const loopSell of forDeleteSell) {
        await this.ticketsSellRepo.remove(loopSell);
      }
    }

    return (await this.getEventTicketsByDateId(eventDate.id)).map(
      (t) => new TicketDto(t),
    );
  }

  async deleteTickets(ticketsUid: string[]): Promise<boolean> {
    for (const uid of ticketsUid) {
      const ticket = await this.getTicketByUid(uid);
      await this.ticketsRepo.remove(ticket);
    }

    return true;
  }

  // UTILS
  async getEventTicketsByDateId(id: number): Promise<Tickets[]> {
    const tickets = await this.ticketsRepo
      .createQueryBuilder('tickets')
      .leftJoinAndSelect('tickets.ticketsSell', 'sell')
      .where('tickets.eventDate = :eventDate', { eventDate: id })
      .orderBy('tickets.id', 'ASC')
      .addOrderBy('sell.id', 'ASC')
      .getMany();

    if (!tickets) {
      return [] as Tickets[];
    }

    return tickets;
  }

  async getTicketByUid(uid: string): Promise<Tickets> {
    const ticket = await this.ticketsRepo
      .createQueryBuilder('tickets')
      .leftJoinAndSelect('tickets.ticketsSell', 'sell')
      .where('tickets.uid = :uid', { uid })
      .getOne();

    if (!ticket) {
      throw new InternalServerErrorException(Exception500.findTickets);
    }

    return ticket;
  }
}
