import { Controller, Get, Param, Render } from '@nestjs/common';
import { CampService } from 'src/camp/camp.service';
import { CouponService } from 'src/coupon/coupon.service';

@Controller('view')
export class ManagementPage {
  constructor(
    private readonly campService: CampService,
    private readonly couponService: CouponService,
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
}
