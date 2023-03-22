import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { SmsService } from '../sms/sms.service';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from './dtos/create-user.dto';
import { FindUserPasswordDto } from './dtos/find-user-password.dto';

import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private smsService: SmsService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {}

  async validateUser(userId: string, password: string) {
    const userData = await this.getUserSelect({ userId }, ['id', 'password']);
    if (!userData) {
      throw new NotFoundException('아이디가 존재하지 않습니다.');
    }

    const isEqual = await bcrypt.compare(password, userData.password);
    if (isEqual === false) {
      throw new UnauthorizedException('비밀번호가 다릅니다.');
    }
    return userData;
  }

  async OAuthLogin({ req, res }) {
    const id = req.user.id;
    const name = req.user.name;
    const email = req.user.email;
    // 1. 회원조회
    const user = await this.userService.getUserByEmail(email);
    // 2, 회원가입이 안되어있다면? 회원가입페이지로 이동
    if (!user) {
      return res.render('index', {
        components: 'socialsignup',
        id: id,
        name: name,
        email: email,
      });
    }
    // 3. 회원가입이 되어있다면? 로그인(AT, RT를 생성해서 브라우저에 전송)한다
    const accessToken = await this.createAccessToken(user.id);
    const refreshToken = await this.createRefreshToken();
    await this.cacheManager.set(refreshToken, user.id);

    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res.redirect(process.env.BASIC_ORIGIN);
  }

  async createSocialUser(userData) {
    await this.userRepository.insert({
      userId: userData.userId,
      password: userData.password,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      birthday: userData.birthday,
      socialType: userData.socialType,
    });
    return { message: '환영합니다 고객님!' };
  }

  /** 로그인
   * @userId 로그인아이디
   * @password 비밀번호
   */
  async login(userData, { refreshToken: refreshTokenCookie = undefined }) {
    if (refreshTokenCookie) {
      await this.cacheManager.del(refreshTokenCookie);
    }

    const accessToken = await this.createAccessToken(userData.id);
    const refreshToken = await this.createRefreshToken();

    const saltRound = process.env.HASH_SALT_OR_ROUND;
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      Number.parseInt(saltRound) ?? 10,
    );

    await this.cacheManager.set(accessToken, {
      hashedRefreshToken,
      userId: userData.id,
    });

    return { accessToken, hashedRefreshToken };
  }

  /**로그아웃
   * @refreshToken
   */
  async logout({ accessToken }) {
    await this.cacheManager.del(accessToken);
  }

  /** 회원가입
   * @name 이름
   * @userId 로그인아이디
   * @password 비밀번호
   * @passwordCheck 비밀번호체크
   * @email 이메일
   * @phone 휴대폰
   * @birthDay 생년월일
   */
  async createUser({
    name,
    userId,
    password,
    email,
    phone,
    birthday,
  }: CreateUserDto) {
    const userData = await this.getUserSelect({ userId }, ['userId']);
    if (userData) {
      throw new ConflictException('아이디가 존재합니다.');
    }

    const saltRound = process.env.HASH_SALT_OR_ROUND;
    password = await bcrypt.hash(password, Number.parseInt(saltRound) ?? 10);

    const { identifiers } = await this.userRepository.insert({
      name,
      userId,
      password,
      email,
      phone,
      birthday,
    });

    await this.cacheManager.del('users');

    return { id: identifiers[0].id };
  }

  /** 회원탈퇴
   * @accesstoken
   */
  async deleteUser({ accessToken, refreshToken }) {
    this.cacheManager.del(refreshToken);
    const { id } = await this.jwtService.verify(accessToken);
    this.userRepository.softDelete(id);
  }

  /** 비밀번호 찾기
   * @userId 로그인 아이디
   * @email 이메일
   * @phone 휴대폰번호
   */
  async findUserPassword(findUserPasswordDto: FindUserPasswordDto) {
    const user = await this.getUserSelect(findUserPasswordDto, ['userId']);

    if (!user) {
      return user;
    }

    await this.cacheManager.set(user.userId, 1);
    setTimeout(async () => {
      if (await this.cacheManager.get(user.userId)) {
        this.cacheManager.del(user.userId);
      }
    }, 1000 * 60 * 3);
    return user;
  }

  /**
   * 비밀번호 재설정
   * @password 비밀번호
   */
  async resetPassword(userId: string, password: string) {
    if (!(await this.cacheManager.get(userId))) {
      throw new NotFoundException('올바른 접근 경로가 아닙니다.');
    }

    const saltRound = process.env.HASH_SALT_OR_ROUND;
    password = await bcrypt.hash(password, Number.parseInt(saltRound) ?? 10);
    this.userRepository.update({ userId }, { password });

    this.cacheManager.del(userId);
    return { message: '비밀번호 재설정 완료' };
  }

  /** where로 원하는 컬럼 불러오기
   * @whereColumns where에 설정할 컬럼 - {} 전달
   * @selectColumns select하고싶은 컬럼 - string[] 전달
   */
  async getUserSelect(whereColumns, selectColumns?) {
    if (!whereColumns) {
      return null;
    }
    const userData = await this.userRepository.findOne({
      select: [...selectColumns],
      where: { ...whereColumns },
    });
    return userData;
  }

  // async sendSMS() {
  //   await this.cacheManager.set('01012341234', 123123);
  //   return 123123;
  // }

  async sendSMS(phone: string) {
    const certificationNumber = await this.smsService.sendSMS(phone);
    await this.cacheManager.set(phone, certificationNumber);
    setTimeout(async () => {
      if (await this.cacheManager.get(phone)) {
        this.cacheManager.del(phone);
      }
    }, 1000 * 60 * 3);

    return certificationNumber;
  }

  async certification({ certificationNumber, phone }) {
    const certificationNumberDB = await this.cacheManager.get(phone);
    const isAuthentication = certificationNumber === +certificationNumberDB;

    if (!isAuthentication) {
      return false;
    }

    await this.cacheManager.del(phone);

    return true;
  }

  /** JWT Access Token 생성 함수 */
  private async createAccessToken(id: number) {
    const accessToken = await this.jwtService.signAsync({ id });
    return accessToken;
  }

  /** JWT Refresh Token 생성 함수 */
  private async createRefreshToken() {
    const refreshToken = await this.jwtService.sign({}, { expiresIn: '23h' });
    return refreshToken;
  }
}
