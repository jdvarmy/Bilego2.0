import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Artists } from './Artists';
import { AbstractPost } from './AbstractPost';
import { EventMeta } from './EventMeta';
import { EventManager } from './EventManager';
import { EventHeader } from './EventHeader';
import { EventDates } from './EventDates';
import { SEO } from './SEO';
import { Taxonomy } from './Taxonomy';
import { Orders } from './Orders';

@Entity()
export class Events extends AbstractPost {
  @OneToOne(() => Artists, (artists) => artists.event, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: Artists;

  @OneToOne(() => EventMeta, (eventMeta) => eventMeta.event)
  eventMeta: EventMeta;

  @OneToOne(() => EventHeader, (eventHeader) => eventHeader.event)
  eventHeader: EventHeader;

  @OneToOne(() => EventManager, (eventManager) => eventManager.event)
  eventManager: EventManager;

  @OneToMany(() => EventDates, (eventDates) => eventDates.event)
  eventDates: EventDates[];

  @ManyToMany(() => Taxonomy, (taxonomy) => taxonomy.event)
  @JoinColumn()
  taxonomy: Taxonomy[];

  @OneToMany(() => Orders, (orders) => orders.event)
  orders: Orders[];

  @OneToOne(() => SEO, (seo) => seo.event, { onDelete: 'SET NULL' })
  @JoinColumn()
  seo: SEO;

  @Column({ type: 'tinytext', nullable: true })
  fragment: string;
}
