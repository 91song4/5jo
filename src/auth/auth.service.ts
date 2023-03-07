import {
  ConflictException,
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

import { User } from 'src/users/users.entity';
import { FindUserIdDto } from './dtos/find-user-id.dto';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async testGetUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  /**
   * 이름과 이메일을 받아서 아이디를 찾아주는 함수
   * @name 이름
   * @email 이메일
   */
  async findUserId({ name, email }: FindUserIdDto) {
    return await this.userRepository.findOne({
      select: ['userId'],
      where: { name, email, deletedAt: null },
    });
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
    const refreshToken = this.createRefreshToken();

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
    email,
    phone,
    birthday,
  }: CreateUserDto) {
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
      birthday,
    });

    return { id: identifiers[0].id };
  }

  /** userId로 원하는 컬럼 불러오기
   * @userId 로그인아이디
   * @selects select하고싶은 컬럼 string Array로 전달
   */
  async getUserByUserId(userId, selects?) {
    return await this.userRepository.findOne({
      select: [...selects],
      where: { userId, deletedAt: null },
    });
  }

  private async createAccessToken(id: number) {
    const accessToken = await this.jwtService.signAsync({ id });
    return accessToken;
  }
  private createRefreshToken() {
    const refreshToken = this.jwtService.sign({}, { expiresIn: '23h' });
    return refreshToken;
  }
}
