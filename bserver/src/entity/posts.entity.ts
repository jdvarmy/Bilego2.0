import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  ID: number;

  @Column({ type: 'bigint', width: 20, nullable: false, default: 0 })
  post_author: number;

  @Column({ type: 'datetime', nullable: false, default: '0000-00-00 00:00:00' })
  post_date: Date;

  @Column({ type: 'datetime', nullable: false, default: '0000-00-00 00:00:00' })
  post_date_gmt: Date;

  @Column({ type: 'longtext', nullable: false })
  post_content: string;

  @Column({ type: 'text', nullable: false })
  post_title: string;

  @Column({ type: 'text', nullable: false })
  post_excerpt: string;

  @Column({ type: 'varchar', width: 20, nullable: false, default: 'publish' })
  post_status: string;

  @Column({ type: 'varchar', width: 20, nullable: false, default: 'open' })
  comment_status: string;

  @Column({ type: 'varchar', width: 20, nullable: false, default: 'open' })
  ping_status: string;

  @Column({ type: 'varchar', width: 255, nullable: false, default: '' })
  post_password: string;

  @Column({ type: 'varchar', width: 200, nullable: false, default: '' })
  post_name: string;

  @Column({ type: 'text', nullable: false })
  to_ping: string;

  @Column({ type: 'text', nullable: false })
  pinged: string;

  @Column({ type: 'datetime', nullable: false, default: '0000-00-00 00:00:00' })
  post_modified: Date;

  @Column({ type: 'datetime', nullable: false, default: '0000-00-00 00:00:00' })
  post_modified_gmt: Date;

  @Column({ type: 'longtext', nullable: false })
  post_content_filtered: string;

  @Column({ type: 'bigint', width: 20, nullable: false, default: 0 })
  post_parent: number;

  @Column({ type: 'varchar', width: 255, nullable: false, default: '' })
  guid: string;

  @Column({ type: 'int', width: 11, nullable: false, default: 0 })
  menu_order: number;

  @Column({ type: 'varchar', width: 20, nullable: false, default: 'post' })
  post_type: string;

  @Column({ type: 'varchar', width: 100, nullable: false, default: '' })
  post_mime_type: string;

  @Column({ type: 'bigint', width: 20, nullable: false, default: 0 })
  comment_count: number;
}
