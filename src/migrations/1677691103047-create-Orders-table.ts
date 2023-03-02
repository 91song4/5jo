import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createOrdersTable1677691103047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Orders',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'selectedDay',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'headcount',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'receipt',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'isReview',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'type',
            type: 'int',
            unsigned: true,
            isNullable: false,
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
          {
            name: 'deletedAt',
            type: 'datetime',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Orders');
  }
}
