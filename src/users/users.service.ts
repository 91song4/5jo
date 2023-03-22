import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
// import { GetUsersInformationDto } from './dto/get-users.dto';
// import { GetUsersInformationByIdDto } from './dto/get-usersbyid.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
// DI를 위해서 자동적으로 생성되는 데코레이터
export class UsersService {
  // 원래는 Repository를 참조하여 비지니스 로직을 실행하기 위해 데이터베이스와 통신을 한다.
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 일단 편의성을 위해 인-메모리 변수로 해결하겠다.
  // private usersinformation = [];
  // 비밀번호를 저장하기 위한 Map 객체
  // private usersinformationPasswords = new Map();

  // 유저 정보 조회 API
  async getUsersInformation(page) {
    console.log(page);
    if (page === undefined) {
      page = 1;
    }

    return await this.userRepository.findAndCount({
      where: { deletedAt: null },
      select: ['id', 'userId', 'name', 'phone', 'email'],
      // 페이지네이션 구현 코드
      // relations: ['category'],
      skip: (page - 1) * 12,
      take: 12,
    });
  }

  async getUserByEmail(email: any) {
    const userobj = await this.userRepository.findOne({
      where: { email, deletedAt: null },
    });
    return userobj;
  }

  // 유저 정보 상세조회 API
  async getUsersInformationById(id: number) {
    const userobj = await this.userRepository.findOne({
      where: { id: id, deletedAt: null },
      select: [
        'id',
        'userId',
        'name',
        'phone',
        'email',
        'birthday',
        'createdAt',
      ],
    });

    const newTypeuserobj: {
      id: number;
      userId: string;
      name: string;
      phone: string;
      email: string;
      // createdAt: Date;
      birthday: Date;
      createdIdDate: string;
    } = {
      id: userobj.id,
      userId: userobj.userId,
      name: userobj.name,
      phone: userobj.phone,
      email: userobj.email,
      birthday: userobj.birthday,
      // createdAt: userobj.createdAt,
      createdIdDate: `${userobj.createdAt.getFullYear()}-${
        userobj.createdAt.getMonth() + 1
      }-${userobj.createdAt.getDate()}`,
    };

    return newTypeuserobj;
  }

  // 유저 정보 수정 API
  async updateUsersInformation(
    id: number,
    name: string,
    phone: string,
    email: string,
    password: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: id, deletedAt: null },
      select: ['name', 'phone', 'email', 'password'],
    });

    if (_.isNil(user)) {
      throw new Error(`user not found. id: + ${id}`);
    }

    const saltRound = process.env.HASH_SALT_OR_ROUND;
    password = await bcrypt.hash(password, Number.parseInt(saltRound) ?? 10);

    this.userRepository.update(id, {
      name,
      phone,
      email,
      password,
    });
  }

  // 유저 정보 삭제 API
  async deleteUsersInformation(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id, deletedAt: null },
    });

    if (_.isNil(user)) {
      throw new Error(`user not found. id: + ${id}`);
    }

    this.userRepository.softDelete(id);
  }

  // 유저 정보 생성 API
  createUsersInformation(
    userId: string,
    name: string,
    phone: string,
    email: string,
    password: string,
    birthday: Date,
  ) {
    this.userRepository.insert({
      userId,
      name,
      phone,
      email,
      password,
      birthday,
    });
  }
}
