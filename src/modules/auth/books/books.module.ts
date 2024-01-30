import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/entities/category.entity';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Image, User, Category])],
  controllers: [BooksController],
  providers: [BooksService, ImagesService, UsersService, CategoriesService],
})
export class BooksModule {}
