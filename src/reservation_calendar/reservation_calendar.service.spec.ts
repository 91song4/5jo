import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCalendarService } from './reservation_calendar.service';

describe('ReservationCalendarService', () => {
  let service: ReservationCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationCalendarService],
    }).compile();

    service = module.get<ReservationCalendarService>(
      ReservationCalendarService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
