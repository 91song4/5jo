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

@ApiTags('coupon')
@Controller('')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  // 캠프 목록 조회
  @Get('/coupon')
  getCamps() {
    return this.couponService.getCoupons();
  }

  // 캠프 상세 조회
  @Get('/coupon/:id')
  getCouponById(@Param('id') couponId: number) {
    return this.couponService.getCouponById(Number(couponId));
  }

  // 새로운 캠프 등록
  @Post('/coupon')
  createCoupon(@Body() data: CreateCouponDto) {
    return this.couponService.createCoupon(
      data.name,
      data.type,
      data.headcount,
      data.price,
    );
  }

  // 캠프 정보 수정
  @Put('/coupon/:id')
  updateCoupon(@Param('id') couponId: number, @Body() data: UpdateCouponDto) {
    return this.couponService.updateCoupon(
      couponId,
      data.name,
      data.type,
      data.headcount,
      data.price,
      data.isRepair,
      data.repairEndDate,
    );
  }

  // 캠프 삭제
  @Delete('/coupon/:id')
  deleteCoupon(@Param('id') couponId: number) {
    return this.couponService.deleteCoupon(couponId);
  }
}
