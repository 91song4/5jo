import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Camp } from 'src/camp/camp.entity';
import { Order } from 'src/order/order.entity';
import { ReservationCalendar } from 'src/reservation_calendar/reservation_calendar.entity';
import { Review } from 'src/review/review.entity';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  // 매우 중요: 서비스에서 사용할 리포지토리 사용을 imports에 명시!
  imports: [
    TypeOrmModule.forFeature([
      User,
      Order,
      Admin,
      Camp,
      Review,
      ReservationCalendar,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService],
})
export class UsersModule {}
