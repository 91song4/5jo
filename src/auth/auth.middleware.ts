import {
  NestMiddleware,
  UnauthorizedException,
  Injectable,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const { accessToken, refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token이 존재하지 않습니다.');
    }
    if (!accessToken) {
      throw new UnauthorizedException('Access Token이 존재하지 않습니다.');
    }

    const {
      refreshToken: getRefreshToken,
      userId,
    }: { refreshToken: string; userId: string } = await this.cacheManager.get(
      refreshToken,
    );

    const isAccessTokenValidate = await this.validateToken(accessToken);
    const isRefreshTokenValidate = await this.validateToken(getRefreshToken);

    if (!userId) {
      throw new UnauthorizedException(
        'Refresh Token의 정보가 서버에 존재하지 않습니다.',
      );
    }

    if (!isRefreshTokenValidate) {
      throw new UnauthorizedException('Refresh Token이 만료되었습니다.');
    }

    if (!isAccessTokenValidate) {
      try {
        const newAccessToken = await this.jwtService.signAsync({
          id: userId,
        });
        res.cookie('accessToken', newAccessToken);
      } catch (error) {
        throw error;
      }
    }
    next();
  }

  private async validateToken(token: string) {
    try {
      const tokenInfo = await this.jwtService.verify(token);
      return tokenInfo;
    } catch (error) {
      return false;
    }
  }
}
