import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createReservationCalendarTable1677696522790
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Reservation_Calendar',
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
            name: 'year',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'month',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'day',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'isReserve',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Reservation_Calendar');
  }
}
