import { CacheModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../config/jwt.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheConfigService } from '../config/cache.config.service';
import { SmsModule } from '../sms/sms.module';
import { User } from '../users/users.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtGoogleStrategy } from './jwt-social-google.strategy';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { Admin } from 'src/admin/admin.entity';
import { Order } from 'src/order/order.entity';
import { Camp } from 'src/camp/camp.entity';
import { ReservationCalendar } from 'src/reservation_calendar/reservation_calendar.entity';
import { Review } from 'src/review/review.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([
      User,
      Admin,
      Order,
      Camp,
      ReservationCalendar,
      Review,
    ]),
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
    PassportModule,
    SmsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtGoogleStrategy,
    JwtStrategy,
    ConfigService,
    UsersService,
    JwtAuthenticationGuard,
  ],
})
export class AuthModule {}
