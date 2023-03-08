import { Controller, Get, Render } from '@nestjs/common';
import { CampService } from 'src/camp/camp.service';

@Controller('view')
export class ManagementPage {
  constructor(private readonly campService: CampService) {}

  @Get('/management')
  @Render('management')
  async main() {
    const camps = await this.campService.getCamps();
    return { component: 'main' };
  }

  @Get('/management/users')
  @Render('users')
  async users() {
    const camps = await this.campService.getCamps();
    return { component: 'users', camps };
  }
}
