import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
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
