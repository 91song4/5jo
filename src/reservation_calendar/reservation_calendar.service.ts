import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationCalendar } from './reservation_calendar.entity';

@Injectable()
export class ReservationCalendarService {
  private readonly logger = new Logger(ReservationCalendarService.name);
  constructor(
    @InjectRepository(ReservationCalendar)
    private readonly reservationCalendarRepository: Repository<ReservationCalendar>,
  ) {}

  async getReservationCalendarData(year: number) {
    const thisYear = new Date().getFullYear();
    const resrevations = await this.reservationCalendarRepository.find({
      year: thisYear,
    });
    return;
  }
}
