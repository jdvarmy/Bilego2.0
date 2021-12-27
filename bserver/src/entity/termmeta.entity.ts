import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Termmeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  meta_id: number;

  @Column({ type: 'bigint', width: 20, nullable: false, default: 0 })
  term_id: number;

  @Column({ type: 'varchar', width: 255, default: 'NULL' })
  meta_key: string;

  @Column({ type: 'longtext' })
  meta_value: string;
}
