import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Image, User])],
  controllers: [BooksController],
  providers: [BooksService, ImagesService, UsersService],
})
export class BooksModule {}
