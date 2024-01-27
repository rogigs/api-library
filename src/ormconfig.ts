import { DataSourceOptions } from 'typeorm';
import { Category } from './category/entities/category.entity';
import { User } from './users/entities/user.entity';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'library',
  synchronize: true,
  logging: true,
  entities: [User, Category],
  subscribers: [],
  migrations: [],
};
