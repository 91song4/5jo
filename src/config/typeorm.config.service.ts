import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

@Injectable() //이 키워드 은근히 빼놓고 작업하다가 DI안된다고 에러가 뜨는 경우가 있음.
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  // 생성자를 통해서 DI
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [User],
      // synchronize: true, // 개발 버전에서는 스키마의 용이한 수정을 위해서 true
    };
  }
}
