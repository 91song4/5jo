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
    super({ usernameField: 'userId', passwordField: 'password' });
  }
  async validate(userId: string, password: string): Promise<any> {
    const userData = await this.authService.validateUser(userId, password);
    if (!userData) {
      throw new UnauthorizedException();
    }
    return userData;
  }
}
