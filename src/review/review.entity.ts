import { join } from 'path';
import { Order } from '../order/order.entity';
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

// 시퀄라이즈의 마이그레이션 파일을 담당

@Entity({ schema: 'glamping', name: 'Reviews' })
export class Review {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  orderId: number;

  @Column('varchar', { length: 15 })
  userId: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('varchar', { length: 200 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => Order, (orders) => orders.reviews)
  @JoinColumn({ name: 'orderId' })
  orders: Order;
}
