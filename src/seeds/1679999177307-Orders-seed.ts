import { Order } from 'src/order/order.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const seed = [
  {
    id: 1,
    selectedDay: new Date(),
    headcount: 4,
    receipt: 50000,
    isReview: false,
    type: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    userId: 2,
    campId: 2,
  },
  {
    id: 2,
    selectedDay: new Date(),
    headcount: 4,
    receipt: 50000,
    isReview: false,
    type: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    userId: 2,
    campId: 3,
  },
];

export class Orders1679999177307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Order, seed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < seed.length; i++) {
      await Promise.resolve(
        queryRunner.manager.delete(Order, { id: seed[i].id }),
      );
    }
  }
}
