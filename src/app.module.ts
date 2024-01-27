import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ImagesModule } from './images/images.module';
import { config } from './ormconfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    TypeOrmModule.forRoot(config),
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
