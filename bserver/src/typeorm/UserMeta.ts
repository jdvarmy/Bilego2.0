import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Users } from './Users';

@Entity()
export class UserMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => Users, (users) => users.userMeta, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @Column({ length: 60, nullable: true })
  name: string;

  @Column({ length: 60, nullable: true })
  surname: string;

  @Column({ type: 'date', nullable: true })
  birthdate: string;

  @Column({ length: 20, nullable: true })
  phone: string;
}
