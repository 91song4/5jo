import { Review } from 'src/review/review.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const seed = [
  {
    orderId: 1,
    userId: 'admin',
    title: 'test1 제목입니다',
    content: 'test1 입니다',
  },
  {
    orderId: 2,
    userId: 'admin',
    title: 'test2 제목입니다',
    content: 'test2 입니다',
  },
  {
    orderId: 3,
    userId: 'admin',
    title: 'test3 제목입니다',
    content: 'test3 입니다',
  },
  {
    orderId: 4,
    userId: 'admin',
    title: 'test4 제목입니다',
    content: 'test4 입니다',
  },
];
export class ReviewsSeed1679925400822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Review, seed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve(queryRunner.manager.delete(Review, seed));
  }
}
