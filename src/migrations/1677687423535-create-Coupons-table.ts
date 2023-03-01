import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCouponsTable1677687423535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Coupons',
        columns: [
          {
            name: 'id',
            type: 'bigint unsigned',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(15)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'discount',
            type: 'int unsigned',
            isNullable: false,
          },
          {
            name: 'dateOfUse',
            type: 'int unsigned',
            isNullable: false,
          },
          {
            name: 'maxDiscount',
            type: 'int unsigned',
            isNullable: true,
            default: 20000,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            isNullable: true,
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Coupons');
  }
}
