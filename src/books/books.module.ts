import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/images/entities/image.entity';
import { ImagesService } from 'src/images/images.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Image, User])],
  controllers: [BooksController],
  providers: [BooksService, ImagesService, UsersService],
})
export class BooksModule {}
