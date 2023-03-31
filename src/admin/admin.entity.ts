import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ schema: 'glamping', name: 'Admins' })
export class Admin {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date | null;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.admin)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User[];
}
