import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractPost } from './AbstractPost';
import { Events } from './Events';
import { SEO } from './SEO';
import { Media } from './Media';

@Entity()
export class Artists extends AbstractPost {
  @OneToMany(() => Events, (event) => event.artist, {
    onDelete: 'SET NULL',
  })
  event: Events;

  @ManyToOne(() => SEO, (seo) => seo.artist, { onDelete: 'SET NULL' })
  @JoinColumn()
  seo: SEO;

  @ManyToOne(() => Media, (media) => media.artistImage, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  image: string;

  @ManyToOne(() => Media, (media) => media.artistAvatar, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  avatar: string;
}
