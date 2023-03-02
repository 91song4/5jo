import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const ormConfig: DataSourceOptions = {
  type: 'mysql',
  port: parseInt(process.env.DataBASE_port),
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
