import { DataSourceOptions } from 'typeorm';

export const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'library',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  subscribers: [],
  migrations: [],
};
