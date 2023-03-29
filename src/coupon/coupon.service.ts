import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './coupon.entity';
import { GiveCoupon } from './give.coupon.entiry';
@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(GiveCoupon)
    private readonly giveCouponRepository: Repository<GiveCoupon>,
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
    return coupon;
  }

  async getAllCouponsByUserId(userId: number) {
    return this.giveCouponRepository.find({ where: { userId } });
  }

  // 유저에게 쿠폰 지급
  async giveCoupon(userId: number, couponId: number) {
    const { dateOfUse } = await this.getCouponById(couponId);
    console.log(dateOfUse);
    let date = new Date();
    date.setDate(date.getDate() + Number(dateOfUse) * 30);
    const giveCoupon = await this.giveCouponRepository.insert({
      couponId,
      userId,
      isUsed: false,
      endDate: date,
    });
    return giveCoupon;
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
