import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camp } from './camp.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CampService {
  constructor(
    @InjectRepository(Camp) private readonly campRepository: Repository<Camp>,
  ) {}

  // 캠프 목록 조회
  async getCamps(page) {
    if (page === undefined) {
      page = 1;
    }
    return await this.campRepository.find({
      // 페이지네이션 구현 코드
      skip: (page - 1) * 15,
      take: 15,
    });
  }

  // 캠프 상세 조회
  async getCampById(id: number) {
    const camp = await this.campRepository.findOne({
      where: { id },
    });
    return camp;
  }

  // 새로운 캠프 등록
  createCamp(name: string, type: number, headcount: number, price: number) {
    const camp = this.campRepository.insert({
      name,
      type,
      headcount,
      price,
      isRepair: false,
    });

    return camp;
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
    return this.campRepository.update(id, {
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
    this.campRepository.softDelete(id);
    return id;
  }
}
