import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 주문 추가
  @Post('/orders')
  createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(
      body.userId,
      body.campId,
      body.selectedDay,
      body.headcount,
      body.receipt,
    );
  }
}
