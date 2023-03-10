import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Cache } from 'cache-manager';
import { Request, Response } from 'express';
import { FindUserIdDto } from './dtos/find-user-id.dto';
import { FindUserPasswordDto } from './dtos/find-user-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SmsService } from '../sms/sms.service';
import { SendSMSDto } from './dtos/send-sms.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, // private smsService: SmsService,
  ) {}

  @Get('/test-auth')
  async testGetUsers() {
    let users = await this.cacheManager.get('users');
    if (!!users) {
      console.log(users);
      console.log('use Cache!!!!!!!!!!!!');
      return users;
    }

    users = await this.authService.testGetUsers();
    console.log('nonUse cache!!!!!!');
    await this.cacheManager.set('users', 'hehe');
    return users;
  }

  @Get('/user/:userId')
  async isExist(@Param('userId') userId: string) {
    return this.authService.getUserSelect({ userId }, ['userId']);
  }

  @Post('/lost/id')
  async findUserId(@Body() findUserIdDto: FindUserIdDto) {
    return await this.authService.findUserId(findUserIdDto);
  }

  @Post('/lost/password')
  async findUserPassword(@Body() findUserPasswordDto: FindUserPasswordDto) {
    const user = await this.authService.getUserSelect(findUserPasswordDto, [
      'userId',
    ]);

    if (!user) {
      return user;
    }

    await this.cacheManager.set(user.userId, 1);
    setTimeout(async () => {
      if (await this.cacheManager.get(user.userId)) {
        this.cacheManager.del(user.userId);
      }
    }, 1000 * 60 * 3);
    return user;
  }

  // @Post('/phnoe')
  // async sendSMS(@Body() { phone }: SendSMSDto) {
  // const certificationNumber = await this.smsService.sendSMS(phone);
  // await this.cacheManager.set(phone, certificationNumber);
  // setTimeout(async () => {
  //   if (await this.cacheManager.get(phone)) {
  //     this.cacheManager.del(phone);
  //   }
  // }, 1000 * 60 * 3);
  // return certificationNumber;
  // return { message: '인증번호를 발송하였습니다.' };
  // }

  // @Post('/phone/:certificationNumber')
  // async certification(
  //   @Param('certificationNumber') certificationNumber: string,
  //   @Body() { phone }: SendSMSDto,
  // ) {
  //   const certificationNumberDB = await this.cacheManager.get(phone);
  //   const isAuthentication = certificationNumber === certificationNumberDB;

  //   if (!isAuthentication) {
  //     return false;
  //   }

  //   await this.cacheManager.del(phone);

  // return true;
  // }

  @Patch('/reset/password/:userId')
  async resetPassword(
    @Param('userId') userId: string,
    @Body() { password }: ResetPasswordDto,
  ) {
    if (!(await this.cacheManager.get(userId))) {
      throw new NotFoundException('올바른 접근 경로가 아닙니다.');
    }

    await this.authService.resetPassword(userId, password);

    this.cacheManager.del(userId);
    return { message: '비밀번호 재설정 완료' };
  }

  @Post('/log-in')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { accessToken, refreshToken, id } = await this.authService.login(
      loginUserDto,
    );
    this.cacheManager.set(refreshToken, id);

    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res.send({ message: '로그인 성공' });
  }

  @Post('/log-out')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    const { refreshToken } = req.cookies;
    this.cacheManager.del(refreshToken);
    res.send({ message: '로그아웃 성공' });
  }

  @Post('/sign-up')
  async createUser(@Body() userDto: CreateUserDto) {
    const id = await this.authService.createUser(userDto);
    this.cacheManager.del('users');

    return id;
  }

  @Delete('/withdrawal')
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    const { accessToken, refreshToken } = req.cookies;
    this.cacheManager.del(refreshToken);
    await this.authService.deleteUser(accessToken);
    res.send({ message: '회원탈퇴 완료' });
  }
}
