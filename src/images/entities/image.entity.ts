import { BaseModel } from 'src/models/baseModel';
import { Column, Entity } from 'typeorm';

@Entity()
export class Image extends BaseModel {
  @Column()
  src: string;

  @Column()
  alt: string;
}
