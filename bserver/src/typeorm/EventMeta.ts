import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Events } from './Events';

@Entity()
export class EventMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Events, (events) => events.eventMeta, { onDelete: 'CASCADE' })
  @JoinColumn()
  event: Events;

  @Column({ type: 'text', nullable: true })
  searchWords: string;

  @Column({ nullable: true })
  ageRestriction: number;

  @Column({ default: false })
  isShowInMainPage: boolean;

  @Column({ nullable: true })
  yamusic: string;

  @Column({ nullable: true })
  youtube: string;
}
