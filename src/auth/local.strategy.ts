import {
  Req,
  Res,
  Body,
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { Request, Response } from 'express';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
  ): Promise<any> {
    const { accessToken, refreshToken, userData } = await this.authService.login(
      loginUserDto,
      req.cookies,
    );
    if (!userData) {
      throw new UnauthorizedException();
    }
    return userData;
  }
}
