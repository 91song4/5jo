import { Order } from 'src/order/order.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const seed = [
  {
    id: 1,
    selectedDay: new Date(),
    headcount: 4,
    receipt: 9999,
    isReview: false,
    type: 1,
    userId: 1,
    campId: 1,
  },
  {
    id: 2,
    selectedDay: new Date(),
    headcount: 4,
    receipt: 9999,
    isReview: false,
    type: 2,
    userId: 1,
    campId: 2,
  },
  {
    id: 3,
    selectedDay: new Date(),
    headcount: 4,
    receipt: 9999,
    isReview: false,
    type: 3,
    userId: 1,
    campId: 3,
  },
  {
    id: 4,
    selectedDay: new Date(),
    headcount: 4,
    receipt: 9999,
    isReview: false,
    type: 4,
    userId: 1,
    campId: 4,
  },
];

export class OrdersSeed1679925231186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.manager.save(Order, seed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve(queryRunner.manager.delete(Order, seed));
  }
}
