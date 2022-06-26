import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventDates } from './EventDates';
import { TicketsSell } from './TicketsSell';
import { OrderItems } from './OrderItems';
import { TicketType } from '../types/enums';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 60, unique: true })
  uid: string;

  @ManyToOne(() => EventDates, (eventDates) => eventDates.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  eventDate: EventDates;

  @OneToMany(() => TicketsSell, (ticketsSell) => ticketsSell.ticket)
  ticketsSell: TicketsSell[];

  @OneToMany(() => OrderItems, (orderItems) => orderItems.ticket)
  orderItems: OrderItems[];

  @Column({
    type: 'enum',
    enum: TicketType,
    default: null,
    nullable: true,
  })
  type: TicketType;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  seat: string;

  @Column({ nullable: true })
  row: string;

  @Column({ nullable: true })
  sector: string;

  // @Column({ nullable: true })
  // mapCoordsUid: string;

  @CreateDateColumn()
  createDateTime: Date;

  @UpdateDateColumn()
  updateDateTime?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
