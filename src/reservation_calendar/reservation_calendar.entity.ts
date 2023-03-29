import { Camp } from '../camp/camp.entity';
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

@Entity({ schema: 'glamping', name: 'Reservation_Calendar' })
export class ReservationCalendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  campId: number;

  @Column()
  reservedDate: Date;

  @Column({ default: true })
  isReserved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: null | Date;

  @ManyToOne(() => Camp, (camp) => camp.reservationCalendar, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'campId' })
  camp: Camp;
}
