import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationCalendar } from './reservation_calendar.entity';
import { ReservationCalendarController } from './reservation_calendar.controller';
import { ReservationCalendarService } from './reservation_calendar.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationCalendar]),
    CacheModule.register(),
  ],
  controllers: [ReservationCalendarController],
  providers: [ReservationCalendarService],
  exports: [ReservationCalendarService, CacheModule],
})
export class ReservationCalendarModule {}
