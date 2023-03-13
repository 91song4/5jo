import {
  Req,
  Res,
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
import { User } from 'src/users/users.entity';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      userIdField: 'userId',
    });
  }
  async validate(userId: string, password: string): Promise<User> {
    const user = this.authService.getUserSelect({ userId, password });
    return user;
  }
}
