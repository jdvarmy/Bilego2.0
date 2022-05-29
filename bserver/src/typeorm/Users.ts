import {
  UserEntityDeleted,
  UserEntityRole,
  UserEntityStatus,
} from 'src/types/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserMeta } from './UserMeta';
import { UserAccess } from './UserAccess';
import { EventManager } from './EventManager';
import { Orders } from './Orders';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 60, unique: true })
  uid: string;

  @OneToOne(() => UserMeta, (userMeta) => userMeta.user)
  userMeta: UserMeta;

  @OneToMany(() => UserAccess, (userAccess) => userAccess.user)
  userAccess: UserAccess[];

  @OneToOne(() => EventManager, (eventManager) => eventManager.user)
  eventManager: EventManager;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 60, unique: true })
  login: string;

  @Column({ length: 60 })
  pass: string;

  @Column({
    type: 'enum',
    enum: UserEntityRole,
    default: UserEntityRole.subscriber,
  })
  role: UserEntityRole;

  @Column({ default: UserEntityStatus.inactive })
  status: number;

  @CreateDateColumn()
  createDateTime;

  @UpdateDateColumn()
  updateDateTime;

  @Column({ default: UserEntityDeleted.false })
  deleted: number;
}
