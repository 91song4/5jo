import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createDepositWithoutBankbookTable1680153879560
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'DepositWithoutBankbook',
        columns: [
          {
            name: 'id',
            type: 'bigint unsigned',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'orderId',
            type: 'int',
          },
          {
            name: 'depositorName',
            type: 'varchar',
          },
          {
            name: 'accountHolderName',
            type: 'varchar',
          },
          {
            name: 'bankName',
            type: 'varchar',
          },
          {
            name: 'accountNumber',
            type: 'varchar',
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
        foreignKeys: [
          {
            columnNames: ['orderId'],
            referencedTableName: 'Orders',
            referencedColumnNames: ['id'],
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('DepositWithoutBankbook');
  }
}
