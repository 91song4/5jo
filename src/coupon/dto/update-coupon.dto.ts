import { PartialType } from '@nestjs/mapped-types';
import { CreateCampDto } from 'src/camp/dto/create-camp.dto';
import { CreateCouponDto } from './create-coupon.dto';

// dto는 시퀄라이즈의 Model을 담당
export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
