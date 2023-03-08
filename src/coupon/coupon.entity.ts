import { Order } from 'src/order/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 시퀄라이즈의 마이그레이션 파일을 담당

@Entity({ schema: 'glamping', name: 'Coupons' })
export class Coupon {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 15 })
  name: string;

  @Column('bigint')
  type: number;

  @Column('bigint')
  headcount: number;

  @Column('bigint')
  price: number;

  @Column('boolean')
  isRepair: boolean;

  @Column()
  repairEndDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: null | Date;

  @OneToMany(() => Order, (order) => order.camp)
  orders: Order[];
}
