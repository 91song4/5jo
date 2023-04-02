import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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

  // 유저가 보유중인 쿠폰 가져오기
  async getAllCouponsByUserId(userId: number) {
    // 쿠폰 사용여부를 판별하기 위해 가진 쿠폰정보 불러옴
    const userCoupons = await this.giveCouponRepository.find({
      where: { userId },
    });

    const couponIds = userCoupons.map((coupon) => coupon.couponId);
    console.log('asdasd', couponIds);

    // 보유중인 쿠폰의 상세 정보를 보여주기 위해 불러옴
    const couponInfo = await this.couponRepository.find({
      where: { id: In(couponIds) },
    });

    return { userCoupons, couponInfo };
  }

  // 유저에게 쿠폰 지급
  async giveCoupon(userId: number, couponId: number) {
    const { dateOfUse } = await this.getCouponById(couponId);
    console.log(dateOfUse);
    const date = new Date();
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
