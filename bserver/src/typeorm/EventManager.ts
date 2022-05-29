import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Events } from './Events';
import { Users } from './Users';

@Entity()
export class EventManager {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Events, (events) => events.eventManager, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  event: Events;

  @OneToOne(() => Users, (users) => users.eventManager, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: Users;

  @Column({ nullable: true })
  percentage: number;

  @Column({ type: 'tinytext', nullable: true })
  meta: string;
}