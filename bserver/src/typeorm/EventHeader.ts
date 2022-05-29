import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Events } from './Events';
import { EventHeaderType } from '../types/enums';

@Entity()
export class EventHeader {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Events, (events) => events.eventHeader, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  event: Events;

  @Column({
    type: 'enum',
    enum: EventHeaderType,
    default: EventHeaderType.image,
  })
  type: EventHeaderType;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ nullable: true })
  meta: string;

  @Column({
    nullable: true,
    default: JSON.stringify({
      title: 'rgba(255, 255, 255, 1)',
      subtitle: 'rgba(255, 255, 255, 1)',
      meta: 'rgba(255, 255, 255, 1)',
    }),
  })
  color: string;
}
