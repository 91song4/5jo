// Module
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { JwtConfigService } from './config/jwt.config.service';

// app
import { AppController } from './app.controller';
import { AppService } from './app.service';
// TypeOrm
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';

// camp
import { CampModule } from './camp/camp.module';
import { CampService } from './camp/camp.service';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/log-in', method: RequestMethod.POST },
        { path: 'auth/sign-up', method: RequestMethod.POST },
      )
      .forRoutes('auth');
  }
}
