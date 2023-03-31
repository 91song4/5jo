import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class DepositWithoutBankbook1680164125732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('DepositWithoutBankbooks');

    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'orderId',
        type: 'bigint',
        isUnique: true,
        unsigned: true,
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Orders',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('DepositWithoutBankbooks');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('orderId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropColumn(table, 'orderId');
  }
}
