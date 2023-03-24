import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationCalendar } from 'src/reservation_calendar/reservation_calendar.entity';
import { Repository, DataSource } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private dataSource: DataSource,
  ) {}

  async createOrder(
    userId: number,
    campId: number,
    selectedDay: string,
    headcount: number,
    receipt: number,
    isReview: boolean,
    type: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const returned = await queryRunner.manager.getRepository(Order).save({
        userId,
        campId,
        selectedDay,
        headcount,
        receipt,
        isReview,
        type,
      });
      const reservationCalendar = await queryRunner.manager
        .getRepository(ReservationCalendar)
        .create();
      reservationCalendar.campId = returned.campId;
      reservationCalendar.reservedDate = new Date(returned.selectedDay);
      reservationCalendar.isReserved = true;
      await queryRunner.manager
        .getRepository(ReservationCalendar)
        .save(reservationCalendar);
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // 주문 가져오기 ( GET )
  async getAllOrders(page): Promise<Order[]> {
    console.log(page);

    // await this.orderRepository.find({
    //   skip: (page - 1) * 5,
    //   take: 5,
    // });

    // const orders = await this.orderRepository
    //   .query(
    //     `SELECT O.id, O.selectedDay, O.headcount, O.receipt, O.isReview, O.type,  O.userId AS orderuserId, U.USERID AS userId, O.CAMPID AS ordercampId, C.NAME AS CampName
    // FROM ORDERS O INNER JOIN USERS U
    // ON O.USERID = U.ID
    // INNER JOIN CAMPS C
    // ON O.CAMPID = C.ID `,
    //   )
    //   .then();

    // return orders;

    const orders = await this.orderRepository.query(`
      SELECT
        O.id,
        O.selectedDay,
        O.headcount,
        O.receipt,
        O.isReview,
        O.type,
        U.USERID AS userId,
        O.CAMPID AS ordercampId,
        C.NAME AS CampName
      FROM ORDERS O
        INNER JOIN USERS U ON O.USERID = U.ID
        INNER JOIN CAMPS C ON O.CAMPID = C.ID
      ORDER BY O.id
      LIMIT ${5} OFFSET ${(page - 1) * 5}
    `);

    return orders.map((order) => ({
      id: order.id,
      selectedDay: order.selectedDay,
      headcount: order.headcount,
      receipt: order.receipt,
      isReview: order.isReview,
      type: order.type,
      userId: order.userId,
      ordercampId: order.ordercampId,
      CampName: order.CampName,
      // 페이지네이션 구현 코드
      // relations: ['category'],
      skip: (page - 1) * 5,
      take: 5,
    }));
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

  // 주문 정보 삭제 ( DELETE )
  async deleteOrder(id: number): Promise<number> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`주문번호 ${id}번은 없습니다`);
    }
    await this.orderRepository.delete(id);

    return id;
  }
}
