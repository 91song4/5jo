import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './tokenPayload.interface';
import { AuthService } from './auth.service';

const cookieExtracter = (req) => {
  let jwt = null;
  if (req?.cookies) {
    jwt = req.cookies['accessToken'];
  }
  console.log(jwt);
  return jwt;
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: cookieExtracter,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const userInfo = this.userService.getUsersInformationById(payload.id);
    return userInfo;
  }
}
