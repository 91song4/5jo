import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCampsTable1677693883059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Camps',
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
            name: 'name',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'headcount',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'price',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'repairEndDate',
            type: 'datetime',
            isNullable: true,
            default: null,
          },
          {
            name: 'isRepair',
            type: 'boolean',
            isNullable: true,
            default: false,
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
    await queryRunner.dropTable('Camps');
  }
}
