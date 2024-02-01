import { Image } from '../../images/entities/image.entity';

export class CreateBookDto {
  name: string;
  image: Image;
  publisher: string;
  author: string;
  year: string;
  language: string;
  description: string;
  category: string;
}
