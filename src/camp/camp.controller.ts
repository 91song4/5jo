import { Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { CampService } from './camp.service';
@Controller('api')
export class CampController {
  constructor(private readonly campService: CampService) {}

  // 캠프 목록 조회
  @Get('/camps')
  getCamps() {
    return this.campService.getCamps();
  }

  // 캠프 상세 조회
  @Get('/camps/:id')
  getCampById(@Param('id') campId: number) {
    console.log('is controller' + this.campService.getCampById(Number(campId)));
    return this.campService.getCampById(Number(campId));
  }

  // 새로운 캠프 등록
  @Post('/camps')
  postCamp() {}

  // 캠프 정보 수정
  @Put('/camps/:id')
  updateCamp() {}

  // 캠프 삭제
  @Delete('/camps/:id')
  deleteCamp() {}
}
