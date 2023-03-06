import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camp } from './camp.entity';

@Injectable()
export class CampService {
  constructor(
    @InjectRepository(Camp) private campRepository: Repository<Camp>,
  ) {}

  // 캠프 목록 조회
  async getCamps() {
    const camps = await this.campRepository.find({});
    return camps;
  }

  // 캠프 상세 조회

  async getCampById(id: number) {
    const camps = await this.campRepository.find({
      where: { id },
    });
    if (camps.length === 0) {
      return console.log('존재하지 않는 번호입니다');
    }
    return camps;
  }

  // 새로운 캠프 등록

  createCamp(name: string, type: number, headcount: number, price: number) {
    this.campRepository.insert({
      name,
      type,
      headcount,
      price,
      isRepair: false,
    });
  }

  // 캠프 정보 수정

  updateCamp(
    id: number,
    name: string,
    type: number,
    headcount: number,
    price: number,
    isRepair: boolean,
    repairEndDate: string | null,
  ) {
    this.campRepository.update(id, {
      name,
      type,
      headcount,
      price,
      isRepair,
      repairEndDate,
    });
  }

  // 캠프 삭제

  deleteCamp(id: number) {
    this.campRepository.delete(id);
  }
}
