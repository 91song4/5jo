import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class ResOrderDto extends CreateOrderDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}
