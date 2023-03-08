import { Controller, Get, Render, Param } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CampService } from 'src/camp/camp.service';

@Controller('view')
export class ManagementPage {
  constructor(
    private readonly appService: AppService,
    private readonly campService: CampService,
  ) {}

  @Get()
  @Render('management')
  async managermain() {
    const camps = await this.campService.getCamps();
    return { camps };
  }
}
