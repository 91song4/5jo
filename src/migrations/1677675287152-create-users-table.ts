import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1677675287152 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Users',
        columns: [
          {
            name: 'id',
            type: 'bigint unsigned',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(10)',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'varchar(15)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'socialType',
            type: 'varchar',
            isNullable: true,
            default: null,
          },
          {
            name: 'email',
            type: 'varchar(30)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar(15)',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'birthDay',
            type: 'datetime',
            isNullable: false,
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Users');
  }
}
