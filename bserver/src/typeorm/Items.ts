import { Entity, JoinColumn, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { AbstractPost } from './AbstractPost';
import { ItemMeta } from './ItemMeta';
import { EventDates } from './EventDates';
import { SEO } from './SEO';
import { Taxonomy } from './Taxonomy';

@Entity()
export class Items extends AbstractPost {
  @OneToOne(() => ItemMeta, (itemMeta) => itemMeta.item)
  itemMeta: ItemMeta;

  @OneToMany(() => EventDates, (eventDates) => eventDates.item)
  eventDates: EventDates[];

  @ManyToMany(() => Taxonomy, (taxonomy) => taxonomy.item)
  @JoinColumn()
  taxonomy: Taxonomy[];

  @OneToOne(() => SEO, (seo) => seo.event, { onDelete: 'SET NULL' })
  @JoinColumn()
  seo: SEO;
}
