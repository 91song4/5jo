import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeUsersColumn1678090215857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Users',
      'birthDay',
      new TableColumn({
        name: 'birthday',
        type: 'datetime',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'Users',
      'birthday',
      new TableColumn({
        name: 'birthDay',
        type: 'datetime',
        isNullable: false,
      }),
    );
  }
}
