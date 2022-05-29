import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractPost } from './AbstractPost';
import { Events } from './Events';
import { SEO } from './SEO';

@Entity()
export class Artists extends AbstractPost {
  @OneToOne(() => Events, (event) => event.artist, {
    onDelete: 'SET NULL',
  })
  event: Events;

  @OneToOne(() => SEO, (seo) => seo.event, { onDelete: 'SET NULL' })
  @JoinColumn()
  seo: SEO;

  @Column()
  avatar: string;
}
