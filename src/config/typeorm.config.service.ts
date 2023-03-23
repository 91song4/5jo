import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      port: this.configService.get<number>('DATABASE_PORT'),
      host: this.configService.get<string>('DATABASE_HOST'),
      database: this.configService.get<string>('DATABASE_NAME'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      autoLoadEntities: true,
      // logging: true,
      synchronize: false,
    };
  }
}

// this.configService.get<boolean>('DATABASE_SYNCHRONIZE')
