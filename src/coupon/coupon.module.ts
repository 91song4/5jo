import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';

import { CouponService } from './coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './coupon.entity';
import { GiveCoupon } from './give.coupon.entiry';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, GiveCoupon])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
