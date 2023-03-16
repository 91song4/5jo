import { Camp } from 'src/camp/camp.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'glamping', name: 'reservation_calendar' })
export class ReservationCalendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reservedDate: Date;

  @Column({ default: false })
  isReserved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: null | Date;

  @ManyToOne(() => Camp, (camp) => camp.reservationCalendar, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campId' })
  camp: Camp;
}
