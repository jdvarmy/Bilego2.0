import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { ECity, ETermType } from '../types/enums';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  getFilteredEvents(
    @Query('c') city?: ECity,
    @Query('category') categories?: ETermType | ETermType[],
    @Query('count') count?: number,
    @Query('offset') offset?: number,
  ) {
    return this.eventService.getFilteredEvents({
      city,
      category: categories || [],
      count: count ?? 10,
      offset: offset ?? 0,
    });
  }

  @Get(':slug')
  getEvent(@Param('slug') slug: string) {
    return this.eventService.getEvent(slug);
  }
}
