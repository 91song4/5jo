import { Review } from '../review/review.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const seed = [
  {
    id: 1,
    userId: 'rookas33',
    content: '음식이 친절하고 사장님이 맛있어요',
    title: '내 인생 최고의 캠핑',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    orderId: 1,
  },
];

export class Reviews1679999205257 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Review, seed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < seed.length; i++) {
      await Promise.resolve(
        queryRunner.manager.delete(Review, { id: seed[i].id }),
      );
    }
  }
}
