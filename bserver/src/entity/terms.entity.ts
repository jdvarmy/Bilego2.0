import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Terms {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  term_id: number;

  @Column({ type: 'varchar', width: 200, nullable: false, default: '' })
  name: string;

  @Column({ type: 'varchar', width: 200, nullable: false, default: '' })
  slug: string;

  @Column({ type: 'bigint', width: 10, nullable: false, default: 0 })
  term_group: number;
}
