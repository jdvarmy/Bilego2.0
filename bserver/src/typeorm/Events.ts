import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Artists } from './Artists';
import { AbstractPost } from './AbstractPost';
import { EventDates } from './EventDates';
import { SEO } from './SEO';
import { Taxonomy } from './Taxonomy';
import { Orders } from './Orders';
import { EventHeaderType } from '../types/enums';
import { Users } from './Users';
import { Media } from './Media';

@Entity()
export class Events extends AbstractPost {
  @ManyToOne(() => Artists, (artists) => artists.event, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: Artists;

  @ManyToOne(() => SEO, (seo) => seo.event, { onDelete: 'SET NULL' })
  @JoinColumn()
  seo: SEO;

  @ManyToOne(() => Users, (users) => users.eventManager, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  eventManager: Users;

  @ManyToMany(() => Taxonomy, (taxonomy) => taxonomy.event)
  @JoinColumn()
  taxonomy: Taxonomy[];

  @OneToMany(() => EventDates, (eventDates) => eventDates.event)
  eventDates: EventDates[];

  @OneToMany(() => Orders, (orders) => orders.event)
  orders: Orders[];

  @ManyToOne(() => Media, (media) => media.eventImage, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  image: string;

  @ManyToOne(() => Media, (media) => media.eventHeaderImage, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  headerImage: string;

  @Column({ type: 'text', nullable: true })
  fragment: string;

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

  @Column({
    type: 'enum',
    enum: EventHeaderType,
    default: EventHeaderType.image,
  })
  type: EventHeaderType;

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

  @Column({ type: 'text', nullable: true })
  concertManagerInfo: string;

  @Column({ nullable: true })
  concertManagerPercentage: number;
}
