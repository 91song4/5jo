import { Controller, Get, Param, Render } from '@nestjs/common';
import { CampService } from 'src/camp/camp.service';
import { CouponService } from 'src/coupon/coupon.service';
import { UsersService } from 'src/users/users.service';

@Controller('view')
export class MyPage {
  constructor(
    private readonly campService: CampService,
    private readonly couponService: CouponService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/mypage/:id')
  @Render('index')
  async mypage(@Param('id') userId: number) {
    const userInfo = await this.usersService.getUsersInformationById(userId);
    return { components: 'mypage', userInfo };
  }
}
