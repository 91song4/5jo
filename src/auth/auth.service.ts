import {
  CACHE_MANAGER,
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { User } from 'src/users/users.entity';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async testGetUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  /**
   * 로그인
   * @userId 로그인아이디
   * @password 비밀번호
   */
  async login({ userId, password }: LoginUserDto) {
    const userData = await this.getUserByUserId(userId, ['id', 'password']);
    if (!userData) {
      throw new NotFoundException('아이디가 존재하지 않습니다.');
    }

    const isEqual = await bcrypt.compare(password, userData.password);
    if (isEqual === false) {
      throw new UnauthorizedException('비밀번호가 다릅니다.');
    }

    const accessToken = await this.createAccessToken(userData.id);
    const refreshToken = await this.createRefreshToken();

    return { accessToken, refreshToken, id: userData.id };
  }

  /**
   * 회원가입
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
    passwordCheck,
    email,
    phone,
    birthDay,
  }: CreateUserDto) {
    if (password !== passwordCheck) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 400);
    }

    const userData = await this.getUserByUserId(userId, ['userId']);
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
      birthDay,
    });

    return { id: identifiers[0].id };
  }

  /** userId로 원하는 컬럼 불러오기
   * @userId 로그인아이디
   * @selects select하고싶은 컬럼 string Array로 전달
   */
  private async getUserByUserId(userId, selects?) {
    return await this.userRepository.findOne({
      select: [...selects],
      where: { userId, deletedAt: null },
    });
  }

  private async createAccessToken(id: number) {
    const accessToken = await this.jwtService.signAsync({ id });
    return accessToken;
  }
  private async createRefreshToken() {
    const refreshToken = await this.jwtService.sign({}, { expiresIn: '23h' });
    return refreshToken;
  }
}
