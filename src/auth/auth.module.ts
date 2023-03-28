import { CacheModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../config/jwt.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheConfigService } from '../config/cache.config.service';
import { SmsModule } from '../sms/sms.module';
import { User } from 'src/users/users.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtGoogleStrategy } from './jwt-social-google.strategy';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
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
    // SmsModule,
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
  exports: [AuthService, JwtModule, JwtAuthenticationGuard],
})
export class AuthModule {}
