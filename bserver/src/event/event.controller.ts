import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('/events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  allEventsLimit(
    @Query('count') count?: number,
    @Query('offset') offset?: number,
  ) {
    return this.eventService.allEventsLimit({
      count: count ?? 10,
      offset: offset ?? 0,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }
}
