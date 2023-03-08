import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@ApiTags('coupon')
@Controller('')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  // 쿠폰 목록 조회
  @Get('/coupon')
  getCoupons() {
    return this.couponService.getCoupons();
  }

  // 쿠폰 상세 조회
  @Get('/coupon/:id')
  getCouponById(@Param('id') couponId: number) {
    return this.couponService.getCouponById(Number(couponId));
  }

  // 새로운 쿠폰 등록
  @Post('/coupon')
  createCoupon(@Body() data: CreateCouponDto) {
    return this.couponService.createCoupon(
      data.name,
      data.discount,
      data.dateOfUse,
      data.maxDiscount,
    );
  }

  // 쿠폰 정보 수정
  @Put('/coupon/:id')
  updateCoupon(@Param('id') couponId: number, @Body() data: UpdateCouponDto) {
    return this.couponService.updateCoupon(
      couponId,
      data.name,
      data.discount,
      data.dateOfUse,
      data.maxDiscount,
    );
  }

  // 쿠폰 삭제
  @Delete('/coupon/:id')
  deleteCoupon(@Param('id') couponId: number) {
    return this.couponService.deleteCoupon(couponId);
  }
}
