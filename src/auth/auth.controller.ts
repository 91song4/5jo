import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Param,
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

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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
    return this.authService.getUserByUserId(userId, ['userId']);
  }

  @Post('/lost/id')
  async findUserId(@Body() findUserIdDto: FindUserIdDto) {
    return await this.authService.findUserId(findUserIdDto);
  }

  @Post('/lost/password')
  async findUserPassword(@Body() findUserPasswordDto: FindUserPasswordDto) {
    return await this.authService.getUserByUserId(findUserPasswordDto.userId, [
      'userId',
    ]);
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
}
