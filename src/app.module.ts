// Module
import { Module } from '@nestjs/common';
// app
import { AppController } from './app.controller';
import { AppService } from './app.service';
// TypeOrm
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';

// camp
import { CampModule } from './camp/camp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 일단 이것은 무조건 가장 위에서!
    CampModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 주목
      useClass: TypeOrmConfigService,
      inject: [ConfigService], // 주목
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
