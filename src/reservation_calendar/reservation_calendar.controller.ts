import { Controller, Get, Query, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservationCalendarService } from './reservation_calendar.service';

@ApiTags('Reservation')
@Controller()
export class ReservationCalendarController {
  constructor(
    private readonly reservationCalendarService: ReservationCalendarService,
  ) {}

  @Get('/reservation')
  @Render('reservation_calendar')
  async getReservationCalendarData(@Query('year') year: number) {
    // const reservationCalendarData =
    // await this.reservationCalendarService.getReservationCalendarData(year);
    // return { reservationCalendarData };
  }
}
