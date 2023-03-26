import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCalendarController } from './reservation_calendar.controller';

describe('ReservationCalendarController', () => {
  let controller: ReservationCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationCalendarController],
    }).compile();

    controller = module.get<ReservationCalendarController>(
      ReservationCalendarController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
