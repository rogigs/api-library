import { ConfigService } from '@nestjs/config'; // Importe o ConfigService
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
  subscribers: [],
  migrations: [],
});
