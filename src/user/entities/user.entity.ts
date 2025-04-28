import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ledger } from '@/ledger/entities/ledger.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '用户名',
  })
  username: string;

  @Column({
    length: 50,
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '头像',
  })
  avatar: string;

  @OneToMany(() => Ledger, (ledger) => ledger.owner)
  ledgers: Ledger[];

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column({
    default: 0,
    comment: '是否删除',
  })
  isDelete: number;
}
