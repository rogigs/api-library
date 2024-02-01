import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  create(createLanguageDto: CreateLanguageDto) {
    return this.languageRepository.save(createLanguageDto);
  }

  findAll() {
    return this.languageRepository.find();
  }
}
