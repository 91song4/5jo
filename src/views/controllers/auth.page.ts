import { Controller, Get, Render } from '@nestjs/common';

@Controller('view')
export class AuthPage {
  @Get('sign-up')
  @Render('index')
  signup() {
    return { components: 'signup' };
  }

  @Get('login')
  @Render('index')
  login() {
    return { components: 'login' };
  }
}
