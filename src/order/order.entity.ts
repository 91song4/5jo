import { Camp } from 'src/camp/camp.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => User)
  readonly user: User;

  @ManyToOne(() => Camp)
  readonly camp: Camp;

  @Column()
  readonly selectedDay: Date;

  @Column()
  readonly headcount: number;

  @Column()
  readonly receipt: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt?: Date;
}
