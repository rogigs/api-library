import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ResponseInterceptor } from './app.interceptor';
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
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
