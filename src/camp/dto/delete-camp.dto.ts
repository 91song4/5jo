import { IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { IsNull } from 'typeorm';

// dto는 시퀄라이즈의 Model을 담당
export class DeleteCampDto {
  @IsDate()
  readonly deletedAt: Date;
}
