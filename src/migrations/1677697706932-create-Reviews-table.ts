import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createReviewsTable1677697706932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Reviews',
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
            name: 'userId',
            type: 'varchar',
            length: '15',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '50',
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Reviews');
  }
}
