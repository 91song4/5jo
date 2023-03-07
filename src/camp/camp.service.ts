import { Injectable } from '@nestjs/common';
import { CampRepository } from './camp.repository';
import { Camp } from './camp.entity';
@Injectable()
export class CampService {
  constructor(private readonly campRepository: CampRepository) {}

  // 캠프 목록 조회
  async getCamps() {
    const camps = await this.campRepository.find();
    return camps;
  }

  // 캠프 상세 조회

  async getCampById(id: number) {
    try {
      const camp = await this.campRepository.findOne({
        where: { id },
      });
      return camp;
    } catch (err) {
      console.log(err);
    }
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
    this.campRepository.update(id, {
      name,
      type,
      headcount,
      price,
      isRepair,
      repairEndDate,
    });
    return;
  }

  // 캠프 삭제

  deleteCamp(id: number) {
    this.campRepository.softDelete(id);
    return id;
  }
}
