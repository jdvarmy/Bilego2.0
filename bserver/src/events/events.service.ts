import { Injectable } from '@nestjs/common';
import { Event } from '../types/types';
import { ApiService } from '../api/api.service';

@Injectable()
export class EventsService {
  constructor(private readonly apiService: ApiService) {}

  async getFilteredEvents(options) {
    return this.apiService.get<Event[]>('events', options);
  }

  async getEvent(slug: string) {
    return this.apiService.get<Event>(`events/${slug}`);
  }
}
