import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventDates } from './EventDates';
import { TicketsSell } from './TicketsSell';
import { OrderItems } from './OrderItems';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => EventDates, (eventDates) => eventDates.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  eventDate: EventDates;

  @OneToMany(() => TicketsSell, (ticketsSell) => ticketsSell.ticket)
  ticketsSell: TicketsSell[];

  @OneToMany(() => OrderItems, (orderItems) => orderItems.ticket)
  orderItems: OrderItems[];

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  seat: string;

  @Column({ nullable: true })
  row: string;

  @Column({ nullable: true })
  sector: string;

  @Column({ nullable: true })
  mapCoordsUid: string;
}
