import { Controller, Get, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CampService } from './camp/camp.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly campService: CampService,
  ) {}

  @Get()
  @Render('index')
  async root() {
    return { message: '환영합니다. 메인페이지 입니다.' };
  }
}
