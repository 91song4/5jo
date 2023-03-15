import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservationCalendarService } from './reservation_calendar.service';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationCalendarController {
  constructor(
    private readonly reservationCalendarService: ReservationCalendarService,
  ) {}

  // 이미 지나간 날짜는 남아있는 아이템이 있더라도 예약이 불가능함.
  // 오늘을 포함하고 싶었는데.. 어떻게 할지 감이 안옴
  @Get(':date')
  async checkAvailability(
    @Param('date') date: string,
  ): Promise<{ [key: string]: boolean }> {
    return this.reservationCalendarService.checkAvailability(date);
  }

  // 아래 코드는 유효성 검사 이후 모든 날을 예약할 수 있음 → 이미 지나간 날에 대해서는 예약이 불가능해야하는데? → 그래서 폐기
  // @Get(':date')
  // async getAvailabilityForDate(
  //   @Param('date') date: string,
  // ): Promise<{ [key: string]: boolean }> {
  //   const availability = await this.reservationCalendarService.isDateAvailable(
  //     date,
  //   );
  //   return { [date]: availability };
  // }
}
// @Controller()
// export class ReservationCalendarController {
//   constructor(
//     private readonly reservationCalendarService: ReservationCalendarService,
//   ) {}

//   @Get('/reservation')
//   @Render('reservation_calendar')
//   async getReservationCalendarData(@Query('year') year: number) {
//     const reservationCalendarData =
//       await this.reservationCalendarService.getReservationCalendarData(year);
//     return { reservationCalendarData };
//   }
// }
