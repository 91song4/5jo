import { Controller, Get, Render } from '@nestjs/common';
import { CampService } from 'src/camp/camp.service';

@Controller('view')
export class ManagementPage {
  constructor(private readonly campService: CampService) {}

  @Get('/management')
  @Render('management')
  async managermain() {
    const camps = await this.campService.getCamps();
    return { camps };
  }
}
