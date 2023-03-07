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
  createOrder(
    userId: number,
    campId: number,
    selectedDay: Date,
    headcount: number,
    receipt: number,
  ) {
    const order = this.orderRepository.create({
      user: { id: userId },
      camp: { id: campId },
      selectedDay,
      headcount,
      receipt,
    });

    return this.orderRepository.save(order);
  }
}
