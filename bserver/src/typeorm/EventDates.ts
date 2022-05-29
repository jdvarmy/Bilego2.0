import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Events } from './Events';
import { Items } from './Items';
import { Maps } from './Maps';
import { Tickets } from './Tickets';

@Entity()
export class EventDates {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Events, (events) => events.eventDates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  event: Events;

  @ManyToOne(() => Items, (item) => item.eventDates, { onDelete: 'SET NULL' })
  @JoinColumn()
  item: Items;

  @ManyToOne(() => Maps, (map) => map.eventDates, { onDelete: 'SET NULL' })
  @JoinColumn()
  map: Maps;

  @OneToMany(() => Tickets, (tickets) => tickets.eventDate)
  tickets: Tickets[];

  @Column({ nullable: true })
  city: string;

  @Column({ type: 'datetime', nullable: true })
  dateFrom: string;

  @Column({ type: 'datetime', nullable: true })
  dateTo: string;

  @Column({ type: 'datetime', nullable: true })
  closeDateTime: string;
}
