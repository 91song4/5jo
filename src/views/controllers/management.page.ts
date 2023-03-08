import { Controller, Get, Render } from '@nestjs/common';

@Controller('view')
export class ManagementPage {
  @Get('/camp')
  @Render('management')
  async camp() {
    return { component: 'main' };
  }

  @Get('/user')
  @Render('management')
  async user() {
    return { component: 'user' };
  }

  @Get('/coupon')
  @Render('management')
  async coupon() {
    return { component: 'coupon' };
  }
}
