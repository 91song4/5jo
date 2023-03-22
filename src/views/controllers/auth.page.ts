import { Controller, Get, Render, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('view')
export class AuthPage {
  // @Get('social-sign-up')
  // @Render('index')
  // async socialsignup(@Req() req: Request) {
  //   return { components: 'socialsignup' };
  // }
  @Get('Personal-information-processing-policy')
  @Render('index')
  pipp() {
    return { components: 'pipp' };
  }
  @Get('terms-of-service')
  @Render('index')
  tos() {
    return { components: 'tos' };
  }

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

  @Get('lost/id')
  @Render('index')
  lostId() {
    return { components: 'lostId' };
  }

  @Get('lost/password')
  @Render('index')
  lostPassword() {
    return { components: 'lostPassword' };
  }

  @Get('reset/password/:userId')
  @Render('index')
  resetPassword() {
    return { components: 'resetPassword' };
  }
}
