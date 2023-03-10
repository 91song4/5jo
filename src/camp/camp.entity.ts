import { Order } from 'src/order/order.entity';
import { ReservationCalendar } from 'src/reservation_calendar/reservation_calendar.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @Column()
  repairEndDate: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: null | Date;

  @OneToMany(() => Order, (order) => order.camp, { onDelete: 'CASCADE' })
  orders: Order[];

  @OneToOne(
    () => ReservationCalendar,
    (reservationCalendar) => reservationCalendar.camp,
    {
      onDelete: 'CASCADE',
    },
  )
  reservationCalendar: ReservationCalendar;
}
