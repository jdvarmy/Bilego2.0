import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Items } from './Items';
import { ItemClosestMetro } from './ItemClosestMetro';

@Entity()
export class ItemMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Items, (items) => items.itemMeta, { onDelete: 'CASCADE' })
  @JoinColumn()
  item: Items;

  @OneToMany(
    () => ItemClosestMetro,
    (itemClosestMetro) => itemClosestMetro.itemMeta,
  )
  itemClosestMetro: ItemClosestMetro[];

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;
}
