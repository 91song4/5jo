import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { GiveCouponDto } from './dto/give-coupon.dto';
import { parseJSON } from 'date-fns';

@UseGuards(AuthGuard('jwt'))
@ApiTags('coupon')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  // 쿠폰 목록 조회
  @Get('')
  getCoupons() {
    return this.couponService.getCoupons();
  }

  // 쿠폰 상세 조회
  @Get('/:id')
  getCouponById(@Param('id') couponId: number) {
    return this.couponService.getCouponById(Number(couponId));
  }

  // 새로운 쿠폰 등록
  @Post('')
  createCoupon(@Body() data: CreateCouponDto) {
    return this.couponService.createCoupon(
      data.name,
      data.discount,
      data.dateOfUse,
      data.maxDiscount,
    );
  }

  // 쿠폰 지급
  @Post('/give')
  giveCoupon(@Body() data: GiveCouponDto) {
    return this.couponService.giveCoupon(data.userId, data.couponId);
  }

  // 유저가 보유중인 쿠폰 가져오기
  @Get('/mycoupon/:id')
  getAllCouponsByUserId(@Param('id') userId: number) {
    const mycoupon = this.couponService.getAllCouponsByUserId(userId);

    return mycoupon;
  }

  // 쿠폰 정보 수정
  @Put('/:id')
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
  @Delete('/:id')
  deleteCoupon(@Param('id') couponId: number) {
    return this.couponService.deleteCoupon(couponId);
  }
}
