import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // 주문 생성
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

    return this.orderRepository.save(order);
  }
}
