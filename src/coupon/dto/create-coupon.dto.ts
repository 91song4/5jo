import {
  IsNumber,
  IsString,
  IsDate,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { IsNull } from 'typeorm';

// dto는 시퀄라이즈의 Model을 담당
export class CreateCouponDto {
  /**
   * 캠프명
   * @example 'C1'
   */
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly discount: number;

  @IsNumber()
  readonly dateOfUse: number;

  @IsNumber()
  readonly maxDiscount: number;
}
