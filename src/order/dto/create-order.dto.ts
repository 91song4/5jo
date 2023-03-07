import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: '유저 번호', required: true })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 1, description: '캠프 번호', required: true })
  @IsNumber()
  readonly campId: number;

  @ApiProperty({
    example: '2022-03-01',
    description: '선택한 날짜',
    required: true,
  })
  @IsDateString()
  readonly selectedDay: string;

  @ApiProperty({ example: 4, description: '이용 인원수', required: true })
  @IsNumber()
  readonly headcount: number;

  @ApiProperty({ example: 80000, description: '총 가격', required: true })
  @IsNumber()
  readonly receipt: number;

  @ApiProperty({
    example: false,
    description: '해당 주문에 대한 리뷰 작성여부',
    required: true,
  })
  @IsBoolean()
  readonly isReview: boolean;

  @ApiProperty({
    example: 0,
    description: '결제 방식 : 0 = 카드 / 1 = 무통장 입금',
    required: true,
  })
  @IsNumber()
  readonly type: number;
}
