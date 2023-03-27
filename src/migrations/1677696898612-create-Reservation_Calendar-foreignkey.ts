import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createReservationCalendarForeignkey1677696898612
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Reservation_Calendar');

    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'campId',
        type: 'bigint',
        unsigned: true,
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['campId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Camps',
        onUpdate: 'cascade',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Reservation_Calendar');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('campId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);
    await queryRunner.dropColumn(table, 'campId');
  }
}
