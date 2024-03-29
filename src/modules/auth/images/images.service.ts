import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
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

  update(id: string, updateImageDto: UpdateImageDto) {
    return this.imagesRepository.update(id, updateImageDto);
  }
}
