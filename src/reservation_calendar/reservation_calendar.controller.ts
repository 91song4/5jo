import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { parseISO } from 'date-fns';
import { CheckReservationDto } from './dto/check-reservation.dto';
import { ReservationCalendarService } from './reservation_calendar.service';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationCalendarController {
  constructor(
    private readonly reservationCalendarService: ReservationCalendarService,
  ) {}

  // 이미 지나간 날짜는 남아있는 아이템이 있더라도 예약이 불가능 / 최대 6개월 이후까지 예약이 가능하게 구현되어있음
  // 제약조건에 '오늘'을 포함하고 싶었는데.. 포함 하는게 좋은지, 아닌지 판단이 잘 안되고 어떻게 구현할지도 잘 모르겠음
  @Get(':date')
  async checkAvailability(@Param('date') date: string) {
    const parsedDate = new Date(date);
    await this.reservationCalendarService.checkAvailability(parsedDate);
    const availableCamps =
      await this.reservationCalendarService.getAvailableCamps(parsedDate);
    return { availableCamps };
  }
}
