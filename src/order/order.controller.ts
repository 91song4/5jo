import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { ResOrderDto } from './dto/order-res.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // 주문 추가 ( POST )
  @ApiResponse({ type: ResOrderDto, status: 201, description: '성공' })
  @ApiOperation({ summary: '캠프 예약' })
  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(
      body.userId,
      body.campId,
      body.selectedDay,
      body.headcount,
      body.receipt,
      body.isReview,
      body.type,
      body.emergencyContact,
      body.requirements,
    );
  }

  // 주문 가져오기 ( GET )
  @ApiResponse({ type: ResOrderDto, status: 200, description: '성공' })
  @ApiOperation({ summary: '모든 주문정보 확인' })
  @Get()
  async getAllOrders(@Query() query): Promise<Order[]> {
    return await this.orderService.getAllOrders(query.page);
  }

  // 유저의 주문 목록 가져오기 ( GET )
  @ApiResponse({ type: ResOrderDto, status: 200, description: '성공' })
  @ApiOperation({ summary: '유저의 주문 목록 가져오기' })
  @Get(':userId')
  async getOrdersByUserId(@Param('userId') userId: number): Promise<Order[]> {
    return this.orderService.getOrdersByUserId(userId);
  }

  // @Get('/orders/user')
  // async getOrders(@Req() req) {
  //   const userId = req.user.id;
  //   return this.orderService.getOrdersByUserId(userId);
  // }

  // 주문 업데이트 ( PUT )
  @ApiResponse({ type: ResOrderDto, status: 200, description: '성공' })
  @ApiOperation({ summary: '주문 업데이트' })
  @Put(':id')
  updateOrder(@Param('id') orderId: number, @Body() body: UpdateOrderDto) {
    return this.orderService.updateOrder(
      orderId,
      body.selectedDay,
      body.headcount,
      body.receipt,
      body.isReview,
      body.type,
      body.emergencyContact,
      body.requirements,
    );
  }

  // 주문 삭제 ( DELETE )
  @ApiResponse({ type: ResOrderDto, status: 200, description: '성공' })
  @ApiOperation({ summary: '주문 삭제' })
  @Delete(':id')
  deleteOrder(@Param('id') orderId: number) {
    return this.orderService.deleteOrder(orderId);
  }
}
