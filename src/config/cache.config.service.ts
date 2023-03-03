import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions<Record<string, any>> {
    return {
      store: redisStore,
      host: this.configService.get<string>('RERESHTOKEN_HOST'),
      port: this.configService.get<number>('RERESHTOKEN_PORT'),
      // refreshToken 하루
      ttl: this.configService.get<number>('RERESHTOKEN_EXP'),
      isGlobal: true,
    };
  }
}