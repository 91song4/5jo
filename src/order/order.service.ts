import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // 주문 생성 ( POST )
  async createOrder(
    userId: number,
    campId: number,
    selectedDay: string,
    headcount: number,
    receipt: number,
    isReview: boolean,
    type: number,
  ) {
    const order = this.orderRepository.create({
      userId,
      campId,
      selectedDay,
      headcount,
      receipt,
      isReview,
      type,
    });

    return await this.orderRepository.save(order);
  }

  // 주문 가져오기 ( GET )
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  // 유저의 주문 목록 가져오기 ( GET )
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({ where: { userId } });
  }

  // 주문 정보 수정하기 ( PUT )
  updateOrder(
    id: number,
    selectedDay: string,
    headcount: number,
    receipt: number,
    isReview: boolean,
    type: number,
  ) {
    return this.orderRepository.update(id, {
      id,
      selectedDay,
      headcount,
      receipt,
      isReview,
      type,
    });
  }
}
