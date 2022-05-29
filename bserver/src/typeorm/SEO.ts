import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Events } from './Events';
import { Items } from './Items';
import { Artists } from './Artists';

@Entity()
export class SEO {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Events, (event) => event.seo)
  event: Events;

  @OneToOne(() => Items, (item) => item.seo)
  item: Items;

  @OneToOne(() => Artists, (artist) => artist.seo)
  artist: Artists;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  author: string;
}
