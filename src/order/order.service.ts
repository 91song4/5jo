import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepositWithoutBankbook } from 'src/deposit-without-bankbook/deposit-without-bankbook.entity';
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

  // POST 주문 만들기 + 쿼리러너(트랜잭션)
  async createOrder(
    userId: number,
    campId: number,
    selectedDay: string,
    headcount: number,
    receipt: number,
    isReview: boolean,
    type: number,
    emergencyContact: string,
    requirements: string,
    name: string,
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
        emergencyContact,
        requirements,
      });

      // 결제타입이 1이면 해당 무통장 테이블에도 데이터를 추가하기
      if (type === 1) {
        const depositWithoutBankbook = await queryRunner.manager
          .getRepository(DepositWithoutBankbook)
          .create();
        // 포린 키 관계이기 때문에 위에서 생성된 주문의 id를 이렇게 받아올 수 있음.
        depositWithoutBankbook.orderId = returned.id;
        depositWithoutBankbook.depositorName = name;
        await queryRunner.manager
          .getRepository(DepositWithoutBankbook)
          .save(depositWithoutBankbook);
      }

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

  // 주문 가져오기 ( GET ) -- emergencyContact, requirements 추가해야함.
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
      FROM Orders O
        INNER JOIN Users U ON O.USERID = U.ID
        INNER JOIN Camps C ON O.CAMPID = C.ID
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

  async getOrderById(orderId: number) {
    return await this.orderRepository.find({ where: { id: orderId } });
  }

  // 유저의 주문 목록 가져오기 ( GET )
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.camp', 'camp')
      .select([
        'order.id',
        'order.userId',
        'order.campId',
        'order.selectedDay',
        'order.headcount',
        'order.receipt',
        'order.isReview',
        'order.type',
        'order.emergencyContact',
        'order.requirements',
        'order.createdAt',
        'order.updatedAt',
        'order.deletedAt',
        'camp.name',
      ])
      .where('order.userId = :userId', { userId })
      .getMany();
  }

  // 주문 정보 수정하기 ( PUT )
  updateOrder(
    id: number,
    selectedDay: string,
    headcount: number,
    receipt: number,
    isReview: boolean,
    type: number,
    emergencyContact: string,
    requirements: string,
  ) {
    return this.orderRepository.update(id, {
      id,
      selectedDay,
      headcount,
      receipt,
      isReview,
      type,
      emergencyContact,
      requirements,
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
