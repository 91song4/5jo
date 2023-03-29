import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Request, Response } from 'express';
import { FindUserIdDto } from './dtos/find-user-id.dto';
import { FindUserPasswordDto } from './dtos/find-user-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { SendSMSDto } from './dtos/send-sms.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { GetUserSelectDto } from './dtos/get-user-select.dto';
import { CreateSocialUserDto } from './dtos/create-social-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // test OK
  // 유저 선택해서 가져오기
  @Get('/user')
  async getUserSelect(
    @Query() { whereColumns, selectColumns }: GetUserSelectDto,
  ) {
    return await this.authService.getUserSelect(whereColumns, selectColumns);
  }

  @Get('/me')
  getMe(@Req() req: any) {
    return req.user;
  }

  // test OK
  // 회원가입 시 아이디체크
  @Get('/user/:userId')
  async isExist(@Param('userId') userId: string) {
    return this.authService.getUserSelect({ userId }, ['userId']);
  }

  // test OK
  // 아이디 찾기
  @Post('/lost/id')
  async findUserId(@Body() findUserIdDto: FindUserIdDto) {
    return await this.authService.getUserSelect(findUserIdDto, ['userId']);
  }

  // test OK
  // 비밀번호 찾기
  @Post('/lost/password')
  async findUserPassword(@Body() findUserPasswordDto: FindUserPasswordDto) {
    return await this.authService.findUserPassword(findUserPasswordDto);
  }

  // test OK
  // 비밀번호 찾기 - 휴댄폰 인증번호 보내기
  @Post('/phone')
  async sendSMS(@Body() { phone }: SendSMSDto) {
    await this.authService.sendSMS(phone);
    return { message: '인증번호를 발송하였습니다.' };
  }

  // test OK
  // 비멀번호 찾기 - 인증번호 체크
  @Post('/phone/:certificationNumber')
  async certification(
    @Param('certificationNumber') certificationNumber: number,
    @Body() { phone }: SendSMSDto,
  ) {
    return await this.authService.certification({ certificationNumber, phone });
  }

  // test OK
  // 비밀번호 재설정
  @Patch('/reset/password/:userId')
  async resetPassword(
    @Param('userId') userId: string,
    @Body() { password }: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(userId, password);
  }

  // test OK
  // UnauthorizedException 걸리면 redis 삭제
  @Delete('/redis')
  deleteRefreshToken(@Req() req: Request) {
    const { accessToken } = req.cookies;
    this.authService.deleteRefreshToken(accessToken);
  }

  // 구글 로그인
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('/login/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    this.authService.OAuthLogin({ req, res });
  }

  @Post('/social-sign-up')
  async socialSignUp(@Body() createSocialUserDto: CreateSocialUserDto) {
    this.authService.createSocialUser(createSocialUserDto);
  }

  // test OK
  // 로그인
  @UseGuards(LocalAuthenticationGuard)
  @Post('/log-in')
  async login(@Req() req: Request, @Res() res: Response) {
    const userData: any = req.user;
    const { accessToken, refreshToken } = await this.authService.login(
      userData,
      req.cookies,
    );

    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.send({ message: '로그인 성공' });
  }

  // test OK
  // 로그아웃
  // @UseGuards(AuthGuard('jwt'))
  @Post('/log-out')
  async logout(@Req() req: Request, @Res() res: Response) {
    // const { id }: any = req.user;
    const id: any = req.user;
    console.log(id, typeof id);
    await this.authService.logout(id);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.send({ message: '로그아웃 성공' });
  }

  // test OK
  // 회원가입
  @Post('/sign-up')
  async createUser(@Body() userDto: CreateUserDto) {
    const id = await this.authService.createUser(userDto);

    return id;
  }

  // 회원탈퇴
  @Delete('/withdrawal')
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    await this.authService.deleteUser(req.cookies);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.send({ message: '회원탈퇴 완료' });
  }
}
