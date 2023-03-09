import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('view')
export class HomePage {
  constructor() {}

  @Get('/home')
  @Render('home')
  async home() {
    return;
  }

  @Get('/reserve')
  @Render('reserve')
  async reserve() {
    return;
  }

  @Get('/rooms')
  @Render('rooms')
  async rooms() {
    return;
  }

  @Get('/community')
  @Render('community')
  async community() {
    return;
  }
}
