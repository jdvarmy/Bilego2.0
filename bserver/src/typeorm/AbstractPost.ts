import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostStatus, UserEntityDeleted } from '../types/enums';

export abstract class AbstractPost {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.pending })
  status: PostStatus;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'longtext', nullable: true })
  text: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createDateTime;

  @UpdateDateColumn()
  updateDateTime;

  @Column({ name: 'deleted', type: 'int', default: UserEntityDeleted.false })
  deleted: number;
}
