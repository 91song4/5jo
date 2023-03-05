import { DataSource } from 'typeorm';
import { ormConfig } from './orm.config';
import * as path from 'path';

const migrationDataSource = new DataSource({
  ...ormConfig,
  migrationsTableName: 'migrations',
  migrations: [path.resolve(__dirname, '../migrations/*.ts')],
});
console.log(path.resolve(__dirname, '../migrations/*.ts'));

export default migrationDataSource;
