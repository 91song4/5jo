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
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: CacheConfigService,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    CampModule,
    UsersModule,
    OrderModule,
    CouponModule,
    AdminModule,
    // SmsModule,
    ReservationCalendarModule,
    ReviewModule,
  ],
  controllers: [AppController, ManagementPage, AuthPage, HomePage],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth')
      .exclude({ path: 'camps', method: RequestMethod.GET })
      .exclude({ path: 'coupon', method: RequestMethod.GET })
      .forRoutes(
        { path: 'auth/log-out', method: RequestMethod.POST },
        { path: 'auth/withdrawal', method: RequestMethod.DELETE },
        CampController,
        CouponController,
      );
  }
}
