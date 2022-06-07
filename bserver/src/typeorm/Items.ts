import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractPost } from './AbstractPost';
import { EventDates } from './EventDates';
import { SEO } from './SEO';
import { Taxonomy } from './Taxonomy';
import { ItemClosestMetro } from './ItemClosestMetro';
import { Media } from './Media';

@Entity()
export class Items extends AbstractPost {
  @OneToMany(() => EventDates, (eventDates) => eventDates.item)
  eventDates: EventDates[];

  @ManyToMany(() => Taxonomy, (taxonomy) => taxonomy.item)
  @JoinColumn()
  taxonomy: Taxonomy[];

  @ManyToOne(() => SEO, (seo) => seo.item, { onDelete: 'SET NULL' })
  @JoinColumn()
  seo: SEO;

  @OneToMany(
    () => ItemClosestMetro,
    (itemClosestMetro) => itemClosestMetro.item,
  )
  itemClosestMetro: ItemClosestMetro[];

  @ManyToOne(() => Media, (media) => media.itemImage, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  image: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;
}
