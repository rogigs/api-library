export class CreateBookDto {
  name: string;
  imgId: string;
  publisher: string;
  author: string;
  year: Date;
  language: string; // TODO: could be a entity
  description: string;
  categoryId: string;
}
