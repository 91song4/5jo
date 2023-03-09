import { MigrationInterface, QueryRunner } from 'typeorm';
import { Camp } from 'src/camp/camp.entity';
const seed = [
  {
    id: 1,
    name: 'A1',
    type: 1,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 2,
    name: 'A2',
    type: 1,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 3,
    name: 'A3',
    type: 1,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 4,
    name: 'A4',
    type: 1,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
];

export class Camps1678359006600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Camp, seed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve(queryRunner.manager.delete(Camp, seed));
  }
}
