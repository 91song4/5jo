import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async isAdmin(userId: number) {
    const isAdmin = await this.adminRepository.findOne({ where: { userId } });

    return isAdmin ? true : false;
  }
}
