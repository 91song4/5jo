import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  // 쿠폰 목록 조회
  async getCoupons() {
    return await this.couponRepository.find();
  }

  /**
   * @param id
   * @returns coupon
   */
  async getCouponById(id: number) {
    try {
      const coupon = await this.couponRepository.findOne({
        where: { id },
      });
      return coupon;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 쿠폰 생성
   * @param name
   * @param discount
   * @param dateOfUse
   * @param maxDiscount
   * @returns
   */
  createCoupon(
    name: string,
    discount: number,
    dateOfUse: number,
    maxDiscount: number,
  ) {
    const coupon = this.couponRepository.insert({
      name,
      discount,
      dateOfUse,
      maxDiscount,
    });
    console.log(coupon);
    return coupon;
  }

  // 쿠폰 정보 수정
  updateCoupon(
    id: number,
    name: string,
    discount: number,
    dateOfUse: number,
    maxDiscount: number,
  ) {
    return this.couponRepository.update(id, {
      name,
      discount,
      dateOfUse,
      maxDiscount,
    });
  }

  // 쿠폰 삭제
  deleteCoupon(id: number) {
    this.couponRepository.delete(id);
    return id;
  }
}
