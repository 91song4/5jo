import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
dotenv.config();

const seed = {
  id: 1,
  name: '최고 관리자',
  userId: 'admin',
  password: process.env.ADMIN_PASSWORD,
  email: 'admin@admin.com',
  phone: '010-0000-0000',
  birthday: '2023-03-02',
  socialType: null,
};

export class UsersSeed1677703338397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHashedSeed = await Promise.resolve({
      ...seed,
      password: await bcrypt.hash(
        seed.password,
        Number.parseInt(process.env.HASH_SALT_OR_ROUND, 10) ?? 10,
      ),
    });

    await queryRunner.manager.save(User, passwordHashedSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve(queryRunner.manager.delete(User, { id: seed.id }));
  }
}
