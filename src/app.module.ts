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
  ],
  controllers: [AppController, ManagementPage, AuthPage],
  providers: [AppService, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/log-in', method: RequestMethod.POST },
        { path: 'auth/sign-up', method: RequestMethod.POST },
        { path: 'auth/user/:userId', method: RequestMethod.GET },
        { path: 'auth/lost/id', method: RequestMethod.POST },
      )
      .forRoutes('auth');
  }
}
