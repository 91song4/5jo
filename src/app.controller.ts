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
  async managermain() {
    const camps = await this.campService.getCamps();
    return { camps };
  }
}
