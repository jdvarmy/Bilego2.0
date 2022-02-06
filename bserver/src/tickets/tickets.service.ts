import { Injectable } from '@nestjs/common';
import { ApiService } from '../api/api.service';
import { Ticket } from '../types/types';

@Injectable()
export class TicketsService {
  constructor(private readonly apiService: ApiService) {}

  async getEventTickets(options) {
    return this.apiService.get<Ticket[]>('tickets', options);
  }
}
