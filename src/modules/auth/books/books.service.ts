import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
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

  create(createBookDto: CreateBookDto, user: string) {
    return this.booksRepository.save({
      ...createBookDto,
      createdByUser: user as DeepPartial<User>,
    });
  }

  search(query: string) {
    return this.booksRepository
      .createQueryBuilder('book')
      .where('book.name LIKE :query', { query: `%${query}%` })
      .andWhere('book.active = :active', { active: 1 })
      .leftJoinAndSelect('book.image', 'image')
      .getMany();
  }

  async findOne(id: string) {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['category', 'language', 'image'],
    });

    if (!book) throw new Error('Book not found');

    return book;
  }

  async findAllPaginated(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [items, total] = await this.booksRepository
      .createQueryBuilder('book')
      .where('book.active = :active', { active: 1 })
      .leftJoinAndSelect('book.image', 'image')
      .take(pageSize)
      .skip(skip)
      .getManyAndCount();

    const totalPages = Math.ceil(total / pageSize);

    return {
      items,
      total,
      currentPage: page,
      totalPages,
    };
  }

  update(id: string, user: User, updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(id, {
      ...updateBookDto,
      updatedByUser: user,
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
