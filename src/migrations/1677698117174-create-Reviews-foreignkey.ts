import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createReviewsForeignkey1677698117174
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Reviews');

    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'orderId',
        type: 'bigint',
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
    const table = await queryRunner.getTable('Reviews');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('orderId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropColumn(table, 'orderId');
  }
}
