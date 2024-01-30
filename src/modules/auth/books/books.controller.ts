import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { CategoriesService } from '../categories/categories.service';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { UsersService } from '../users/users.service';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly imagesService: ImagesService,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Request() req) {
    const image = await this.imagesService.create(createBookDto.image);

    return this.booksService.create(
      {
        ...createBookDto,
        image: image as Image,
      },
      req.user.id,
    );
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const book = await this.booksService.findOne(id);
    const category = await this.categoriesService.findOne(book.category);

    if (!book) {
      throw new Error('Book not found');
    }
    if (!category) {
      throw new Error('Category not found');
    }

    return { ...book, category: category };
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
  ) {
    return this.booksService.findAllPaginated(page, pageSize);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Request() req,
  ) {
    const user = await this.usersService.find(req.user.email);

    if (!user) {
      throw new Error('User not found');
    }

    await this.imagesService.update(
      updateBookDto.image.id,
      updateBookDto.image,
    );

    return this.booksService.update(id, user, { ...updateBookDto });
  }

  @Patch(':id/delete')
  async deleteLogical(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Request() req,
  ) {
    const user = await this.usersService.find(req.user.email);

    if (!user) {
      throw new Error('User not found');
    }

    return this.booksService.deleteLogical(id, user, updateBookDto);
  }
}
