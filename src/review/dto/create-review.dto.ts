import { IsNumber, IsString } from 'class-validator';

// dto는 시퀄라이즈의 Model을 담당
export class CreateReviewDto {
  @IsNumber()
  readonly orderId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}
