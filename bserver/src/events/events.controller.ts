import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { City, SortType, TermType } from '../types/enums';
import { EventRequestPropType } from '../types/types';

@Controller('')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('/events')
  getFilteredEvents(
    @Query('city') city?: City,
    @Query('offset') offset?: number,
    @Query('count') count?: number,
    @Query('sort') sort?: SortType,
    @Query('weekends') weekends?: boolean,
    @Query('include') include?: string,
    @Query('exclude') exclude?: string,
  ) {
    const props: any = {
      city,
      offset: offset ?? 0,
      count: count ?? 10,
      sort: sort ?? SortType.asc,
      weekends: weekends ?? false,
    };
    if (include) {
      props.include = include;
    }
    if (exclude) {
      props.exclude = exclude;
    }

    return this.eventService.getFilteredEvents(props);
  }

  @Get('/events/:slug')
  getEvent(@Param('slug') slug: string) {
    return this.eventService.getEvent(slug);
  }
}
