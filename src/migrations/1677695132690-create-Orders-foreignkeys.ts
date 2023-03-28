import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createOrdersForeignkey1677695132690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Orders', [
      new TableColumn({
        name: 'userId',
        type: 'bigint',
        unsigned: true,
        isNullable: false,
      }),
      new TableColumn({
        name: 'campId',
        type: 'bigint',
        unsigned: true,
        isNullable: false,
      }),
    ]);

    await queryRunner.createForeignKeys('Orders', [
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        onUpdate: 'cascade',
      }),
      new TableForeignKey({
        columnNames: ['campId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Camps',
        onUpdate: 'cascade',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Orders');
    const foreignKey = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.indexOf('userId') !== -1 ||
        fk.columnNames.indexOf('campId') !== -1,
    );
    await queryRunner.dropForeignKeys(table, foreignKey);
    await queryRunner.dropColumns(table, ['userId', 'campId']);
  }
}
