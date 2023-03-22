import { Camp } from '../camp/camp.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ schema: 'glamping', name: 'reservation_calendar' })
export class ReservationCalendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  day: number;

  @Column()
  isReserve: boolean;

  @OneToOne(() => Camp, (camp) => camp.reservationCalendar, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  camp: Camp;
}
