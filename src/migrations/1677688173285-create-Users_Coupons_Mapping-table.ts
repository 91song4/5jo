import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createUsersCouponsMappingTable1677688173285
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users_Coupons_Mapping',
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
            name: 'couponId',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'isUsed',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'endDate',
            type: 'datetime',
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
        ],
      }),
    );

    await queryRunner.createForeignKeys('Users_Coupons_Mapping', [
      new TableForeignKey({
        columnNames: ['couponId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Coupons',
        onUpdate: 'cascade',
      }),
      new TableForeignKey({
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        columnNames: ['userId'],
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Users_Coupons_Mapping');
  }
}
