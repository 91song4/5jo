import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('view')
export class HomePage {
  constructor() {}

  @Get('/home')
  @Render('index')
  async home() {
    return { component: 'home' };
  }

  @Get('/reserve')
  @Render('index')
  async reserve() {
    return { component: 'reserve' };
  }

  @Get('/rooms')
  @Render('index')
  async rooms() {
    return { component: 'rooms' };
  }

  @Get('/community')
  @Render('index')
  async community() {
    return { component: 'community' };
  }

  @Get('/inquiry')
  @Render('index')
  async inquiry() {
    return { component: 'inquiry' };
  }
}
