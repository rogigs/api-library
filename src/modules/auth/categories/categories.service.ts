import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new Error('Category not found');

    return category;
  }

  findAll() {
    return this.categoryRepository.find();
  }
}
