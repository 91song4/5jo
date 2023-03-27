// Module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// camp
import { CampController } from './camp.controller';
import { CampService } from './camp.service';
import { Camp } from './camp.entity';
import { Order } from '../order/order.entity';
import { User } from '../users/users.entity';
import { Admin } from '../admin/admin.entity';
import { Review } from '../review/review.entity';
import { ReservationCalendar } from '../reservation_calendar/reservation_calendar.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Camp,
      Order,
      User,
      Admin,
      Review,
      ReservationCalendar,
    ]),
  ],
  controllers: [CampController],
  providers: [CampService],
  exports: [CampService],
})
export class CampModule {}
