import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  
  async createUser({
    name,
    userId,
    password,
    passwordCheck,
    email,
    phone,
    birthDay,
  }:CreateUserDto) {
    if (password !== passwordCheck) {
      throw new HttpException('비밀번호가 일치하지 않습니다.', 400);
    }

    const existUser =  await this.userRepository.find({where:{userId}});
    if(existUser.length >0){
      throw new ConflictException('아이디가 존재합니다.');
    }
    
    const saltRound = process.env.HASH_SALT_OR_ROUND;
    const passwordCopy  = await bcrypt.hash(password, Number.parseInt(saltRound)??10);
    
    console.log(await bcrypt.compare(password, passwordCopy));
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
}
