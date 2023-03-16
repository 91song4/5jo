import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeUsersColumn1678964100421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Users',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'varchar(25)',
        isUnique: true,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Users',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'varchar(15)',
        isUnique: true,
        isNullable: false,
      }),
    );
  }
}
