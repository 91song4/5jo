import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Cache } from 'cache-manager';
import { Response } from 'express';

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

  @Post('/log-in')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { accessToken, refreshToken, id } = await this.authService.login(
      loginUserDto,
    );
    this.cacheManager.set(refreshToken, id);

    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    return 'hgehe';
  }

  @Post('/sign-up')
  async createUser(@Body() userDto: CreateUserDto) {
    const id = await this.authService.createUser(userDto);
    this.cacheManager.del('users');

    return id;
  }
}
