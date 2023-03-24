import { MigrationInterface, QueryRunner } from 'typeorm';
import { Camp } from 'src/camp/camp.entity';
const seed = [
  {
    id: 1,
    name: '블루 칼날부리',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 2,
    name: '블루 늑대',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 3,
    name: '블루 두꺼비',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 4,
    name: '블루 작은골렘',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 5,
    name: '블루 레드골렘',
    type: 2,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 6,
    name: '블루 블루골렘',
    type: 2,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 7,
    name: '레드 칼날부리',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 8,
    name: '레드 늑대',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 9,
    name: '레드 두꺼비',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 10,
    name: '레드 작은골렘',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 11,
    name: '레드 레드골렘',
    type: 2,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 12,
    name: '레드 블루골렘',
    type: 2,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 13,
    name: '드래곤',
    type: 3,
    headcount: 4,
    price: 150000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 14,
    name: '바론',
    type: 3,
    headcount: 4,
    price: 150000,
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
