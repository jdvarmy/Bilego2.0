import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './Orders';
import { Tickets } from './Tickets';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Orders, (order) => order.orderItems, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: Orders;

  @ManyToOne(() => Tickets, (ticket) => ticket.orderItems, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  ticket: Tickets;

  // todo: добавить ссылку на TicketSell для обратной связи заказа с конкретным периодом продажи билета

  @Column()
  price: number;

  @Column()
  service: number;

  @Column()
  discount: number;

  @Column()
  totalPrice: number;

  @Column()
  quantity: number;
}
