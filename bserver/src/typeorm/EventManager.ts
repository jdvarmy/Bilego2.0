import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Users, (users) => users.eventManager, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  user: Users;

  @Column({ nullable: true })
  percentage: number;

  @Column({ type: 'text', nullable: true })
  meta: string;
}
