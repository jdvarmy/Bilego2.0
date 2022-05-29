import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventDates } from './EventDates';

@Entity()
export class Maps {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToMany(() => EventDates, (eventDates) => eventDates.map)
  eventDates: EventDates[];

  @Column({ type: 'longtext', nullable: true })
  xml: string;

  @Column({ nullable: true })
  attributes: string;

  @Column({ nullable: true })
  mini: string;

  @Column({ nullable: true })
  background: string;
}
