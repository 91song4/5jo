import { MigrationInterface, QueryRunner } from 'typeorm';
import { Camp } from 'src/camp/camp.entity';
const seed = [
  {
    id: 1,
    name: '칼날부리(Red)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 2,
    name: '늑대(Red)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 3,
    name: '두꺼비(Red)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 4,
    name: '작은골렘(Red)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 5,
    name: '블루골렘(Red)',
    type: 2,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 6,
    name: '레드골렘(Red)',
    type: 2,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 7,
    name: '칼날부리(Blue)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 8,
    name: '늑대(Blue)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 9,
    name: '두꺼비(Blue)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 10,
    name: '작은골렘(Blue)',
    type: 1,
    headcount: 4,
    price: 50000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 11,
    name: '블루골렘(Blue)',
    type: 2,
    headcount: 4,
    price: 100000,
    repairEndDate: null,
    isRepair: false,
  },
  {
    id: 12,
    name: '레드골렘(Blue)',
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
