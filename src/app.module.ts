// Module
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { CacheConfigService } from './config/cache.config.service';
import { JwtConfigService } from './config/jwt.config.service';

// app
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// TypeOrm
import { TypeOrmConfigService } from './config/typeorm.config.service';

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
import { ReservationCalendarController } from './reservation_calendar/reservation_calendar.controller';
import { ReservationCalendarService } from './reservation_calendar/reservation_calendar.service';
import { ReservationCalendarModule } from './reservation_calendar/reservation_calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CampModule,
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
    AuthModule,

    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    OrderModule,
    CouponModule,
    AdminModule,
    ReservationCalendarModule,
  ],
  controllers: [
    AppController,
    ManagementPage,
    AuthPage,
    HomePage,
    ReservationCalendarController,
  ],
  providers: [AppService, AuthMiddleware, ReservationCalendarService],
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
