import { Controller, Get, Param, Render, UseGuards, Req } from '@nestjs/common';
import { CampService } from '../../camp/camp.service';
import { CouponService } from '../../coupon/coupon.service';
import { UsersService } from '../../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { OrderService } from 'src/order/order.service';
import { User } from 'src/users/users.entity';
import { ReviewService } from 'src/review/review.service';

@Controller('view')
export class MyPage {
  constructor(
    private readonly campService: CampService,
    private readonly couponService: CouponService,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get('/mypage')
  @UseGuards(AuthGuard('jwt'))
  @Render('index')
  async mypage(@Req() req: Request) {
    const userInfo = req.user as User;
    const myCoupons = await this.couponService.getAllCouponsByUserId(
      userInfo.id,
    );
    const myOrders = await this.orderService.getOrdersByUserId(userInfo.id);
    const myReviews = await this.reviewService.getReviewByUserId(
      userInfo.userId,
    );
    console.log(userInfo, myCoupons, myOrders, myReviews);
    return { components: 'mypage', userInfo, myCoupons, myOrders, myReviews };
  }

  // 미들웨어 적용가능 or 어스가드 완성 시 main.page.ts로 옮겨가야함
  @Get('/payment')
  @UseGuards(AuthGuard('jwt'))
  @Render('index')
  async payment(@Req() req: Request) {
    const userInfo = req.user;
    return { components: 'payment', userInfo };
  }
}
