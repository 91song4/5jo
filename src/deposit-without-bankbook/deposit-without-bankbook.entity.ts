import { Order } from 'src/order/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class DepositWithoutBankbook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  depositorName: string;

  @Column()
  accountHolderName: string | null;

  @Column()
  bankName: string | null;

  @Column()
  accountNumber: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToOne(() => Order)
  @JoinColumn()
  product: Order;
}
