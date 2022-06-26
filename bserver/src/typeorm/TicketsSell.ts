import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tickets } from './Tickets';

@Entity()
export class TicketsSell {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 60, unique: true })
  uid: string;

  @ManyToOne(() => Tickets, (ticket) => ticket.ticketsSell, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  ticket: Tickets;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  service: number;

  @Column({ default: 0 })
  totalPrice: number;

  @Column({ type: 'datetime', nullable: true })
  dateFrom: string;

  @Column({ type: 'datetime', nullable: true })
  dateTo: string;

  @Column({ nullable: true })
  color: string;
}
