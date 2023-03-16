import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addUsersCollumn1678928654494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Users',
      new TableColumn({
        name: 'socialType',
        type: 'varchar(20)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('Users');
    await queryRunner.dropColumn(table, 'socialType');
  }
}
