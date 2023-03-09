import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/users/users.entity';
import { Camp } from 'src/camp/camp.entity';
import { Order } from 'src/order/order.entity';
dotenv.config();

export const ormConfig: DataSourceOptions = {
  type: 'mysql',
  port: parseInt(process.env.DATABASE_PORT),
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [User, Camp, Order],
  synchronize: false,
};
