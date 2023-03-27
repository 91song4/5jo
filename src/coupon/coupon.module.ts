import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { Coupon } from './coupon.entity';
import { CouponService } from './coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
