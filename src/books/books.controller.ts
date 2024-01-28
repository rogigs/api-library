import { Body, Controller, Post } from '@nestjs/common';
import { ImagesService } from 'src/images/images.service';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly imagesService: ImagesService,
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const image = await this.imagesService.create(createBookDto.image);

    return this.booksService.create({
      ...createBookDto,
      image: image.id as any,
    });
  }
}
