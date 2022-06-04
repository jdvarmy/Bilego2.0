import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from './Users';
import { Media } from './Media';

@Entity()
export class UserMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Users, (users) => users.userMeta, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @ManyToOne(() => Media, (image) => image.userMetaAvatar, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  avatar: Media;

  @Column({ length: 60, nullable: true })
  name: string;

  @Column({ length: 60, nullable: true })
  surname: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  concertManagerInfo: string;

  @Column({ nullable: true })
  concertManagerPercentage: number;
}
