import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { City, SortType } from '../types/enums';
import { ReqEventDto } from '../dtos/ReqEventDto';
import { EventDto } from '../dtos/EventDto';

@Controller('v1/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  // todo: refactor
  @Get()
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

  @Get(':uid')
  getEvent(@Param('uid') uid: string): Promise<EventDto> {
    try {
      return this.eventService.getEvent(uid);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('save')
  saveEvent(): Promise<EventDto> {
    try {
      return this.eventService.saveTemplateEvent();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Put('save')
  editEvent(@Body() eventDto: ReqEventDto): Promise<EventDto> {
    try {
      return this.eventService.saveEvent(eventDto);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
