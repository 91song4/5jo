import { Order } from '../order/order.entity';
import { ReservationCalendar } from '../reservation_calendar/reservation_calendar.entity';
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

@Entity({ schema: 'glamping', name: 'Camps' })
export class Camp {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { length: 20 })
  name: string;

  @Column('bigint')
  type: number;

  @Column('bigint')
  headcount: number;

  @Column('bigint')
  price: number;

  @Column('boolean')
  isRepair: boolean;

  @Column({ nullable: true })
  repairEndDate: null | Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: null | Date;

  @OneToMany(() => Order, (order) => order.camp, { onDelete: 'CASCADE' })
  orders: Order[];

  @OneToMany(
    () => ReservationCalendar,
    (reservationCalendar) => reservationCalendar.camp,
  )
  reservationCalendar: ReservationCalendar[];
}
