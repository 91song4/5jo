import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { async } from 'rxjs';
dotenv.config();

const seeds = [
  {
    id: 1,
    name: '최고 관리자',
    userId: 'admin',
    password: process.env.ADMIN_PASSWORD,
    email: 'admin@admin.com',
    phone: '010-0000-0000',
    birthday: '2023-03-02',
    socialType: null,
  },
  {
    id: 2,
    name: '유상우',
    userId: 'rookas33',
    password: 'bo11',
    email: 'rookas33@gmail.com',
    phone: '010-7329-5467',
    birthday: '1999-10-15',
    socialType: null,
  },
];

export class UsersSeed1677703338397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHashedSeeds = await Promise.all(
      seeds.map(async (seed) => ({
        ...seed,
        password: await bcrypt.hash(
          seed.password,
          Number.parseInt(process.env.HASH_SALT_OR_ROUND, 10) ?? 10,
        ),
      })),
    );
    await queryRunner.manager.save(User, passwordHashedSeeds);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      seeds.map((seed) => queryRunner.manager.delete(User, { id: seed.id })),
    );
  }
}
