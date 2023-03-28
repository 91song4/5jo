import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { CampService } from '../../camp/camp.service';
import { CouponService } from '../../coupon/coupon.service';
import { OrderService } from '../../order/order.service';
import { UsersService } from '../../users/users.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('view')
export class ManagementPage {
  constructor(
    private readonly campService: CampService,
    private readonly couponService: CouponService,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService,
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
    return { component: 'camps', camps }; //여기참고
  }

  @Get('/management/camp/register')
  @Render('management')
  async campForm() {
    return { component: 'campRegister' };
  }

  @Get('/management/camp/update/:id')
  @Render('management')
  async campUpdateForm(@Param('id') campId: number) {
    const camp = await this.campService.getCampById(campId);
    return { component: 'campUpdateForm', camp };
  }

  @Get('/management/camp/:id')
  @Render('management')
  async camp(@Param('id') campId: number) {
    const camp = await this.campService.getCampById(campId);
    return { component: 'camp', camp };
  }

  @Get('/management/coupon')
  @Render('management')
  async coupons() {
    const coupons = await this.couponService.getCoupons();
    return { component: 'coupons', coupons };
  }

  @Get('/management/coupon/register')
  @Render('management')
  async couponForm() {
    return { component: 'couponRegister' };
  }
  @Get('/management/coupon/update/:id')
  @Render('management')
  async couponUpdateForm(@Param('id') couponId: number) {
    const coupon = await this.couponService.getCouponById(couponId);
    return { component: 'couponUpdateForm', coupon };
  }

  @Get('/management/coupon/:id')
  @Render('management')
  async coupon(@Param('id') couponId: number) {
    const coupon = await this.couponService.getCouponById(couponId);
    return { component: 'coupon', coupon };
  }

  @Get('/management/users')
  @Render('management')
  async users(@Query() query) {
    if (query.page === undefined) {
      query['page'] = 1;
    }

    const users = await this.usersService.getUsersInformation(query.page);

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

  @Get('/management/orders')
  @Render('management')
  async orderlist(@Query() query) {
    if (query.page === undefined) {
      query['page'] = 1;
    }

    const orderlist = await this.orderService.getAllOrders(query.page);

    return { component: 'orderlist', orderlist };
  }
}
