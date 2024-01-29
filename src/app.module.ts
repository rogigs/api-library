import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/auth//categories/categories.module';
import { ImagesModule } from './modules/auth//images/images.module';
import { UsersModule } from './modules/auth//users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from './modules/auth/books/books.module';
import { config } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    ImagesModule,
    CategoriesModule,
    BooksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
