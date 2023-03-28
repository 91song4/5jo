import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

const cookieExtracter = (req) => {
  let jwt = null;
  if (req?.cookies) {
    jwt = req.cookies?.['accessToken'];
  }

  return jwt;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: cookieExtracter,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    const userInfo = this.userService.getUsersInformationById(payload.id);
    return userInfo;
  }
}
