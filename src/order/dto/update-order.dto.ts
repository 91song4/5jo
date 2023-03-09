import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    example: '2022-03-01',
    description: '선택된 날짜',
    required: false,
  })
  @IsDateString()
  readonly selectedDay: string;

  @ApiProperty({ example: 4, description: '총 인원', required: false })
  @IsNumber()
  readonly headcount: number;

  @ApiProperty({ example: 80000, description: '총 가격', required: false })
  @IsNumber()
  readonly receipt: number;

  @ApiProperty({
    example: false,
    description: '해당 주문에 대한 리뷰가 존재하는지',
    required: false,
  })
  @IsBoolean()
  readonly isReview: boolean;

  @ApiProperty({
    example: 0,
    description: '결제 타입 : 0 = 카드 / 1 = 무통장 입금',
    required: false,
  })
  @IsNumber()
  readonly type: number;
}
