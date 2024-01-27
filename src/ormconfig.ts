import { DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';

export const config: DataSourceOptions = {
  type: 'mysql',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'library',
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
};
