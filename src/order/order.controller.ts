import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResOrderDto } from './dto/order-res.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 주문 추가 ( POST )
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

  // 주문 가져오기 ( GET )
  @ApiResponse({ type: ResOrderDto, status: 200, description: '성공' })
  @ApiOperation({ summary: '모든 주문정보 확인' })
  @Get('/orders')
  async getAllOrders(): Promise<Order[]> {
    return await this.orderService.getAllOrders();
  }

  // 유저의 주문 목록 가져오기 ( GET )
  @ApiResponse({ type: ResOrderDto, status: 200, description: '성공' })
  @ApiOperation({ summary: '유저의 주문 목록 가져오기' })
  @Get('/orders/user/:userId')
  async getOrdersByUserId(@Param('userId') userId: number) {
    return this.orderService.getOrdersByUserId(userId);
  }

  // @Get('/orders/user')
  // async getOrders(@Req() req) {
  //   const userId = req.user.id;
  //   return this.orderService.getOrdersByUserId(userId);
  // }
}
