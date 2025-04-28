import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Ledger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    comment: '账本名称',
  })
  name: string;

  @Column({
    comment: '封面',
  })
  cover: string;

  @Column({
    comment: '类型',
  })
  type: string;

  @ManyToOne(() => User)
  owner: User;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  member: User[];

  @Column({
    comment: '邀请码',
  })
  invitationCode: string;

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
