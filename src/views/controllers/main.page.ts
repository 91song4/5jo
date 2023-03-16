import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('view')
export class HomePage {
  constructor(private readonly configService: ConfigService) {}
  // @Get('/home')
  // @Render('index')
  // async home() {
  //   return { components: 'home' };
  // }

  @Get('/reserve')
  @Render('index')
  async reserve() {
    return { components: 'reserve' };
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
