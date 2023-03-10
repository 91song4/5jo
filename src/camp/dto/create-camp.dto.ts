import { IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { IsNull } from 'typeorm';

// dto는 시퀄라이즈의 Model을 담당
export class CreateCampDto {
  /**
   * 캠프명
   * @example 'C1'
   */
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly type: number;

  @IsNumber()
  readonly headcount: number;

  @IsNumber()
  readonly price: number;
}
