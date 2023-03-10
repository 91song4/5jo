import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "2475828kkK!",
      database: "glamping",
      entities: [],
      synchronize: true
    };
  }
}