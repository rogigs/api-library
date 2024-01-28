import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  create(createImageDto: CreateImageDto) {
    return this.imagesRepository.save(createImageDto);
  }

  async findAllPaginated(page: number, pageSize: number) {
    const [data, total] = await this.imagesRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      data,
      total,
      currentPage: page,
      totalPages,
    };
  }
}
