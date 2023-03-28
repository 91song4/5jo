// Module
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt.config.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { CacheConfigService } from './config/cache.config.service';
// import { SmsModule } from './sms/sms.module';
import { EventsModule } from './events/events.module';

// app
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// TypeOrm
import { TypeOrmConfigService } from './config/typeorm.config.service';

// auth
import { AuthModule } from './auth/auth.module';

// camp
import { CampModule } from './camp/camp.module';
import { UsersModule } from './users/users.module';
import { ManagementPage } from './views/controllers/management.page';
import { AuthPage } from './views/controllers/auth.page';

// Order
import { OrderModule } from './order/order.module';
import { CouponModule } from './coupon/coupon.module';
import { AdminModule } from './admin/admin.module';
import { CampController } from './camp/camp.controller';
import { CouponController } from './coupon/coupon.controller';
import { HomePage } from './views/controllers/main.page';

// import { SmsService } from './sms/sms.service';
// import { SmsModule } from './sms/sms.module';
import { ReservationCalendarModule } from './reservation_calendar/reservation_calendar.module';
import { ReviewModule } from './review/review.module';
import { MyPage } from './views/controllers/my.page';
import { UsersService } from './users/users.service';
import { TestModule } from './test/test.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import JwtAuthenticationGuard from './auth/jwt-authentication.guard';
import { ReservationCalendarController } from './reservation_calendar/reservation_calendar.controller';
import { ReviewController } from './review/review.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: CacheConfigService,
    }),
    AuthModule,
    CampModule,
    UsersModule,
    OrderModule,
    CouponModule,
    AdminModule,
    EventsModule,
    // SmsModule,
    ReviewModule,
    ReservationCalendarModule,
    TestModule,
  ],
  controllers: [AppController, ManagementPage, AuthPage, HomePage, MyPage],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth')
      .exclude({ path: 'camps', method: RequestMethod.GET })
      .exclude({ path: 'coupon', method: RequestMethod.GET })
      .exclude({ path: 'view', method: RequestMethod.GET })
      .exclude({ path: 'reviews/:id', method: RequestMethod.GET })
      .forRoutes(
        { path: 'view/mypage', method: RequestMethod.ALL },
        { path: 'view/chatting', method: RequestMethod.GET },
        { path: 'auth/log-out', method: RequestMethod.POST },
        { path: 'auth/withdrawal', method: RequestMethod.DELETE },
        CampController,
        CouponController,
        ReservationCalendarController,
        ReviewController,
      );
  }
}
