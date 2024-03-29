import { er } from '@fullcalendar/core/internal-common';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { CampService } from './camp.service';
// dto
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';

@ApiTags('camp')
@Controller('camps')
export class CampController {
  constructor(private readonly campService: CampService) {}

  // 캠프 목록 조회
  @Get()
  async getCamps(@Query() query) {
    try {
      return this.campService.getCamps(query.page);
    } catch (err) {
      console.log(err);
    }
  }

  // 캠프 상세 조회
  @Get('/:id')
  getCampById(@Param('id') campId: number) {
    return this.campService.getCampById(Number(campId));
  }

  // 새로운 캠프 등록
  @Post()
  createCamp(@Body() data: CreateCampDto) {
    return this.campService.createCamp(
      data.name,
      data.type,
      data.headcount,
      data.price,
    );
  }

  // 캠프 정보 수정
  @Put('/:id')
  updateCamp(@Param('id') campId: number, @Body() data: UpdateCampDto) {
    return this.campService.updateCamp(
      campId,
      data.name,
      data.type,
      data.headcount,
      data.price,
      data.isRepair,
      data.repairEndDate,
    );
  }

  // 캠프 삭제
  @Delete('/:id')
  deleteCamp(@Param('id') campId: number) {
    return this.campService.deleteCamp(campId);
  }
}
