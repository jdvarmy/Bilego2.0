import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users';
import { Artists } from './Artists';
import { Items } from './Items';
import { Events } from './Events';

@Entity()
export class Media {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToMany(() => Users, (user) => user.avatar)
  userAvatar: Users;

  @OneToMany(() => Artists, (artist) => artist.image)
  artistImage: Artists;
  @OneToMany(() => Artists, (artist) => artist.avatar)
  artistAvatar: Artists;

  @OneToMany(() => Items, (item) => item.image)
  itemImage: Items;

  @OneToMany(() => Events, (event) => event.image)
  eventImage: Events;
  @OneToMany(() => Events, (event) => event.headerImage)
  eventHeaderImage: Events;

  @Column({ default: '' })
  name: string;

  @Column()
  originalName: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  encoding: string;

  @Column()
  size: number;
}
