import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
Book;
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.booksRepository.save(createBookDto);
  }

  async findAllPaginated(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [data, total] = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.image', 'image')
      .take(pageSize)
      .skip(skip)
      .getManyAndCount();

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      currentPage: page,
      totalPages,
    };
  }
}
