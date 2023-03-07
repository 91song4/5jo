import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResOrderDto } from './dto/order-res.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 주문 추가
  @ApiResponse({ type: ResOrderDto, status: 201, description: '성공' })
  @ApiOperation({ summary: '캠프 예약' })
  @Post('/orders')
  createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(
      body.userId,
      body.campId,
      body.selectedDay,
      body.headcount,
      body.receipt,
      body.isReview,
      body.type,
    );
  }
}
