import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Event } from '../types/types';
import { ApiService } from '../api/api.service';
import { ReqEventDto } from '../dtos/ReqEventDto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDates, Events } from '../typeorm';
import { Repository } from 'typeorm';
import { EventDto } from '../dtos/EventDto';
import { v4 as uidv4 } from 'uuid';
import { InternalServerErrorException_500 } from '../types/enums';
import { ReqEventDateDto } from '../dtos/ReqEventDateDto';
import { EventDatesDto } from '../dtos/EventDatesDto';

@Injectable()
export class EventsService {
  constructor(
    private readonly apiService: ApiService,
    @InjectRepository(Events) private eventsRepo: Repository<Events>,
    @InjectRepository(EventDates)
    private eventDatesRepo: Repository<EventDates>,
  ) {}

  async getFilteredEvents(options) {
    return this.apiService.get<Event[]>('events', options);
  }

  async getEvent(uid: string) {
    return new EventDto(await this.getEventByUid(uid));
  }

  async saveTemplateEvent(): Promise<EventDto> {
    const uid = uidv4();

    const event = this.eventsRepo.create({
      uid,
      slug: `new-event-${+new Date()}`,
    });
    await this.eventsRepo.save(event);

    const eventDates = this.eventDatesRepo.create({ event });
    await this.eventDatesRepo.save(eventDates);

    return new EventDto(await this.getEventByUid(uid));
  }

  async editEvent(data: ReqEventDto): Promise<EventDto> {
    const { uid, ...eventData } = data;

    const eventFromDb = await this.getEventByUid(uid);
    if (!eventFromDb) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.findEventUid,
      );
    }

    const updateEventData = this.eventsRepo.create(eventData);
    return new EventDto(
      await this.eventsRepo.save({ ...eventFromDb, ...updateEventData }),
    );
  }

  // EVENT DATES
  async getEventDates(uid: string): Promise<EventDates[]> {
    const event = await this.getEventByUid(uid);

    return this.getEventDatesByEvent(event.id);
  }

  async saveTemplateEventDate(eventUid: string): Promise<EventDates> {
    const event = await this.getEventByUid(eventUid);

    const eventDates = this.eventDatesRepo.create({ event });
    return await this.eventDatesRepo.save(eventDates);
  }

  async deleteEventDate(id: string): Promise<boolean> {
    const date = await this.eventDatesRepo.findOne({
      where: { id: parseInt(id) },
    });
    await this.eventDatesRepo.remove(date);

    return true;
  }

  async editEventDate(data: ReqEventDateDto): Promise<any> {
    const { id, ...eventDateData } = data;

    if (!id) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.editNoEventDateId,
      );
    }
    const eventDateFromDb = await this.getEventDateById(id);

    const eventDates = this.eventDatesRepo.create(eventDateData);
    return new EventDatesDto(
      await this.eventDatesRepo.save({ ...eventDateFromDb, ...eventDates }),
    );
  }

  // UTILS
  async getEventByUid(uid: string): Promise<Events> {
    const event = await this.eventsRepo.findOne({
      where: { uid },
      relations: ['eventDates'],
    });

    if (!event) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.findEvent,
      );
    }

    return event;
  }

  async getEventDateById(id: number): Promise<EventDates> {
    const eventDate = await this.eventDatesRepo.findOne({
      where: { id },
    });

    if (!eventDate) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.findEventDate,
      );
    }

    return eventDate;
  }

  async getEventDatesByEvent(id: number): Promise<EventDates[]> {
    const eventDates = await this.eventDatesRepo
      .createQueryBuilder('dates')
      .where('dates.event = :event', {
        event: id,
      })
      .orderBy('dates.id', 'ASC')
      .getMany();

    if (!eventDates) {
      throw new InternalServerErrorException(
        InternalServerErrorException_500.findEventDates,
      );
    }

    return eventDates;
  }
}
