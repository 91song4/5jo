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

    if (!accessToken) {
      throw new UnauthorizedException('Access Token이 존재하지 않습니다.');
    }
    const { id }: any = await this.jwtService.decode(accessToken);

    if (!refreshToken) {
      await this.cacheManager.del(id);
      throw new UnauthorizedException('Refresh Token이 존재하지 않습니다.');
    }

    const isRefreshTokenValidate = await this.validateToken(refreshToken);
    const isAccessTokenValidate = await this.validateToken(accessToken);

    if (!isRefreshTokenValidate) {
      await this.cacheManager.del(id);
      throw new UnauthorizedException('Refresh Token이 만료되었습니다.');
    }

    const hashedRefreshToken: any = await this.cacheManager.get(id.toString());

    if (!hashedRefreshToken) {
      throw new UnauthorizedException(
        'Refresh Token의 정보가 서버에 존재하지 않습니다.',
      );
    }

    const compareRefreshToken: boolean = await bcrypt.compare(
      refreshToken,
      hashedRefreshToken.hashedRefreshToken,
    );

    console.log(compareRefreshToken);

    if (!compareRefreshToken) {
      await this.cacheManager.del(id);
      throw new UnauthorizedException('Refresh Token이 일치하지 않습니다.');
    }

    if (!isAccessTokenValidate) {
      try {
        const newAccessToken = await this.jwtService.signAsync({
          id,
        });
        res.cookie('accessToken', newAccessToken, { httpOnly: true });
      } catch (error) {
        throw error;
      }
    }
    req.user = id;
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
