import { IsNumber } from 'class-validator';

// dto는 시퀄라이즈의 Model을 담당
export class GiveCouponDto {
  @IsNumber()
  readonly couponId: number;

  @IsNumber()
  readonly userId: number;
}
