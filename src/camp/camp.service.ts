import { Injectable } from '@nestjs/common';

@Injectable()
export class CampService {
  private camps = [
    {
      id: 1,
      name: 'A1',
      max: 4,
      price: 50000,
      status: 1,
    },
    {
      id: 2,
      name: 'B1',
      max: 8,
      price: 100000,
      status: 2,
    },
  ];

  // 캠프 목록 조회
  getCamps() {
    return this.camps;
  }

  // 캠프 상세 조회

  getCampById(id: number) {
    const camp = this.camps.find((camp) => {
      return camp.id === id;
    });
    return camp;
  }

  // 새로운 캠프 등록

  postCamp() {}

  // 캠프 정보 수정

  updateCamp() {}

  // 캠프 삭제

  deleteCamp() {}
}
