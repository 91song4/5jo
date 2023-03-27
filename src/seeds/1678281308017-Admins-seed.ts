import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { Admin } from '../admin/admin.entity';

dotenv.config();

const seed = {
  userId: 1,
};
export class AdminsSeed1678281308017 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Admin, seed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve(
      queryRunner.manager.delete(Admin, { id: seed.userId }),
    );
  }
}
