import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserMeta } from './UserMeta';

@Entity()
export class Media {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToMany(() => UserMeta, (userMeta) => userMeta.avatar)
  userMetaAvatar: UserMeta;
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
