import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaxonomyLink, TaxonomyType } from '../types/enums';
import { Events } from './Events';
import { Items } from './Items';

@Entity()
export class Taxonomy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToMany(() => Events, (event) => event.taxonomy)
  event: Events[];

  @ManyToMany(() => Items, (item) => item.taxonomy)
  item: Items[];

  @Column({ type: 'enum', enum: TaxonomyLink })
  link: TaxonomyLink;

  @Column({ type: 'enum', enum: TaxonomyType })
  type: TaxonomyType;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  sortNumber: number;

  @Column({ default: false })
  showInMenu: boolean;

  @Column({ default: false })
  showInMainPage: boolean;
}
