import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users';

@Entity()
export class Media {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToMany(() => Users, (user) => user.avatar)
  userAvatar: Users;
  // todo: добавить остальные связи на таблицы

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
