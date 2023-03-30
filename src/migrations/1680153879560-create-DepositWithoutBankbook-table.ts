import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createDepositWithoutBankbookTable1680153879560
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'DepositWithoutBankbooks',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'depositorName',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'accountHolderName',
            type: 'varchar',
            length: '10',
            isNullable: true,
          },
          {
            name: 'bankName',
            length: '15',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'accountNumber',
            length: '15',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('DepositWithoutBankbook');
  }
}
