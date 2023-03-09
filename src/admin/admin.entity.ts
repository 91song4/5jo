import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity({ schema: 'glamping', name: 'Admins' })
export class Admin {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date | null;

  @OneToOne(() => User, (user) => user.admin)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
