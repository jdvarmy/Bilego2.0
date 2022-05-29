import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemMeta } from './ItemMeta';

@Entity()
export class ItemClosestMetro {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => ItemMeta, (itemMeta) => itemMeta.itemClosestMetro, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  itemMeta: ItemMeta;

  @Column({ nullable: true })
  metro: string;

  @Column({ nullable: true })
  color: string;
}
