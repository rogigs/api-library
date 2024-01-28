import { Image } from 'src/images/entities/image.entity';

export class CreateBookDto {
  name: string;
  image: Image;
  publisher: string;
  author: string;
  year: string;
  language: string; // TODO: could be a entity
  description: string;
  categoryId: string;
}
