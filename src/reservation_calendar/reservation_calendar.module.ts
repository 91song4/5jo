import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationCalendar } from './reservation_calendar.entity';
import { ReservationCalendarController } from './reservation_calendar.controller';
import { ReservationCalendarService } from './reservation_calendar.service';
import { Camp } from '../camp/camp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationCalendar, Camp])],
  controllers: [ReservationCalendarController],
  providers: [ReservationCalendarService],
  exports: [ReservationCalendarService],
})
export class ReservationCalendarModule {}
