import { Controller, Get, Param, Render } from '@nestjs/common';
import { CampService } from 'src/camp/camp.service';

@Controller('view')
export class ManagementPage {
  constructor(private readonly campService: CampService) {}

  @Get('/management')
  @Render('management')
  async main() {
    return { component: 'main' };
  }

  @Get('/management/camp')
  @Render('management')
  async camps() {
    const camps = await this.campService.getCamps();
    return { component: 'camps', camps };
  }

  @Get('/management/camp/:id')
  @Render('management')
  async camp(@Param('id') campId: number) {
    const camp = await this.campService.getCampById(campId);
    return { component: 'camp', camp };
  }

  @Get('/management/camp/registe')
  @Render('management')
  async campRegisteForm() {
    return { component: 'campRegiste' };
  }

  @Get('/management/user')
  @Render('management')
  async user() {
    return { component: 'user' };
  }

  @Get('/management/coupon')
  @Render('management')
  async coupon() {
    return { component: 'coupon' };
  }
}
