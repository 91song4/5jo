import { Controller, Get, Param, Render } from '@nestjs/common';
import { number } from 'joi';
import { CampService } from 'src/camp/camp.service';
import { UsersService } from 'src/users/users.service';

@Controller('view')
export class ManagementPage {
  constructor(
    private readonly campService: CampService,
    private readonly usersService: UsersService,
  ) {}

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

  @Get('/management/users')
  @Render('management')
  async users() {
    const users = await this.usersService.getUsersInformation();

    return { component: 'users', users };
  }

  @Get('/management/users/:id')
  @Render('management')
  async usersInfo(@Param('id') id: number) {
    const usersInfo = await this.usersService.getUsersInformationById(id);

    return { component: 'usersInfo', usersInfo };
  }

  @Get('/management/users/update/:id')
  @Render('management')
  async usersUpdate(@Param('id') id: number) {
    return { component: 'usersUpdate' };
  }

  @Get('/management/coupon')
  @Render('management')
  async coupon() {
    return { component: 'coupon' };
  }
}
