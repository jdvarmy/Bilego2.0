import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Event } from '../types/types';
import { ApiService } from '../api/api.service';
import { ReqEventDto } from '../dtos/ReqEventDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from '../typeorm';
import { Repository } from 'typeorm';
import { EventDto } from '../dtos/EventDto';
import { v4 as uidv4 } from 'uuid';
import { InternalServerErrorException_500 } from '../types/enums';

@Injectable()
export class EventsService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Events) private eventsRepo: Repository<Events>,
  ) {}

  async getFilteredEvents(options) {
    return this.apiService.get<Event[]>('events', options);
  }

  async getEvent(uid: string) {
    return new EventDto(await this.getEventByUid(uid));
  }

  async saveTemplateEvent(): Promise<EventDto> {
    const event = this.eventsRepo.create({
      uid: uidv4(),
      slug: `new-event-${+new Date()}`,
    });

    return new EventDto(await this.eventsRepo.save(event));
  }

  async saveEvent(data: ReqEventDto): Promise<EventDto> {
    const { uid, ...eventData } = data;

    const eventFromBd = await this.getEventByUid(uid);
    if (!eventFromBd) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.findEventUid,
      );
    }

    const updateEventData = this.eventsRepo.create(eventData);

    return new EventDto(
      await this.eventsRepo.save({ ...eventFromBd, ...updateEventData }),
    );
  }

  // UTILS
  async getEventByUid(uid: string) {
    const event = await this.eventsRepo.findOne({ where: { uid } });

    if (!event) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.findEvent,
      );
    }

    return event;
  }
}
