import { Admin } from 'src/admin/admin.entity';
import { Order } from 'src/order/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'glamping', name: 'Users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id: number;

  @Index({ unique: true })
  @Column('varchar')
  readonly userId: string;

  @Column('varchar', { select: false })
  readonly password: string;

  @Column('varchar', { nullable: true, default: null })
  readonly socialType: string;

  @Index()
  @Column('varchar', { length: 10 })
  readonly name: string;

  @Index({ unique: true })
  @Column('varchar', { length: 15 })
  readonly phone: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30 })
  readonly email: string;

  @Column('date')
  readonly birthday: Date;

  @CreateDateColumn({ nullable: true })
  readonly createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  readonly updatedAt: Date;

  @DeleteDateColumn({ default: null })
  readonly deletedAt: Date | null;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Admin, (admin) => admin.user)
  readonly admin: Admin;
}
