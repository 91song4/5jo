import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller('view')
export class HomePage {
  constructor() {}

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
}
