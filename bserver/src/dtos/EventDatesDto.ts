import { TicketType } from '../types/enums';
import { EventDates } from '../typeorm';

export class EventDatesDto {
  id: number;
  type?: TicketType;
  dateFrom?: Date;
  dateTo?: Date;
  closeDateTime?: Date;

  constructor(eventDate: EventDates) {
    this.id = eventDate.id;
    this.type = eventDate.type;
    this.dateFrom = eventDate.dateFrom;
    this.dateTo = eventDate.dateTo;
    this.closeDateTime = eventDate.closeDateTime;
  }
}
