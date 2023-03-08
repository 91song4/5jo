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

  // // 캠프 목록 조회
  // async getCoupons() {
  //   return await this.couponRepository.find();
  // }

  // // 캠프 상세 조회
  // async getCouponById(id: number) {
  //   try {
  //     const coupon = await this.couponRepository.findOne({
  //       where: { id },
  //     });
  //     return coupon;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // 쿠폰 등록
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

  // // 캠프 정보 수정

  // updateCoupon(
  //   id: number,
  //   name: string,
  //   type: number,
  //   headcount: number,
  //   price: number,
  //   isRepair: boolean,
  //   repairEndDate: string | null,
  // ) {
  //   return this.couponRepository.update(id, {
  //     name,
  //     type,
  //     headcount,
  //     price,
  //     isRepair,
  //     repairEndDate,
  //   });
  // }

  // // 캠프 삭제

  // deleteCoupon(id: number) {
  //   this.couponRepository.delete(id);
  //   return id;
  // }
}
