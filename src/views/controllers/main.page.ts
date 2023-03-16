import { Controller, Get, Param, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('view')
export class HomePage {
  constructor(private readonly configService: ConfigService) {}
  // @Get('/home')
  // @Render('index')
  // async home() {
  //   return { components: 'home' };
  // }

  // @Get('/reserve')
  @Get('/reserve/:day')
  @Render('index')
  // async reserve() {
  async reserve(@Param('day') day: string) {
    // TODO - 1911-1-56 같은 걸로 못들어오게 예외처리
    return {
      components: 'reserve',
      socketReserve: this.configService.get('SOCKET_NAMESPACE_RESERVE'),
      day,
    };
  }

  @Get('/rooms')
  @Render('index')
  async rooms() {
    return { components: 'rooms' };
  }

  @Get('/community')
  @Render('index')
  async community() {
    return { components: 'community' };
  }

  @Get('/inquiry')
  @Render('index')
  async inquiry() {
    return { components: 'inquiry' };
  }

  @Get('/chatting')
  @Render('index')
  async chatting() {
    return {
      components: 'chatting',
      socketChat: this.configService.get('SOCKET_NAMESPACE_CHAT'),
    };
  }
}
