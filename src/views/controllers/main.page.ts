import { Controller, Get, Param, Render, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('view')
export class HomePage {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  // @Get('/home')
  // @Render('index')
  // async home() {
  //   return { components: 'home' };
  // }

  @Get('/reserve')
  @Render('index')
  async reservationCalendar() {
    return { components: 'reservationCalendar' };
  }

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
  @UseGuards(AuthGuard('jwt'))
  @Render('index')
  async chatting(@Req() req) {
    return {
      components: 'chatting',
      userId: req.user.id,
      socketChat: this.configService.get('SOCKET_NAMESPACE_CHAT'),
    };
  }

  @Get('/payment')
  @Render('index')
  async payment() {
    return { components: 'payment' };
  }
}
