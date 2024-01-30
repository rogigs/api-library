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

  findOne(id: string) {
    return this.booksRepository
      .createQueryBuilder('book')
      .where('book.id = :id', { id })
      .leftJoinAndSelect('book.image', 'image')
      .orWhere('book.deletedByUserId IS NULL')
      .orWhere('book.updateAt IS NULL')
      .orWhere('book.deleteAt IS NULL')
      .orWhere('book.updatedByUserId IS NULL')
      .getOne();
  }

  async findAllPaginated(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [items, total] = await this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.image', 'image')
      .where('book.active = :active', { active: 1 })
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
