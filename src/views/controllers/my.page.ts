import { Controller, Get, Param, Render, UseGuards, Req } from '@nestjs/common';
import { CampService } from 'src/camp/camp.service';
import { CouponService } from 'src/coupon/coupon.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('view')
export class MyPage {
  constructor(
    private readonly campService: CampService,
    private readonly couponService: CouponService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/mypage/:id')
  @UseGuards(AuthGuard('jwt'))
  @Render('index')
  async mypage(@Req() req: Request) {
    const userInfo = req.user;
    console.log(userInfo);
    return { components: 'mypage', userInfo };
  }
}
