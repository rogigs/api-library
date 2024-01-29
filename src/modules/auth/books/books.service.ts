import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.booksRepository.save(createBookDto);
  }

  find(id: string) {
    return this.booksRepository.findOne({ where: { id } });
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

  update(id: string, user: User, updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(id, {
      ...updateBookDto,
      updatedByUser: user, // TODO: user sessions
      updateAt: new Date(),
    });
  }

  async deleteLogical(id: string, user: User, updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(id, {
      ...updateBookDto,
      active: 0,
      deleteAt: new Date(),
      deletedByUser: user,
    });
  }
}
