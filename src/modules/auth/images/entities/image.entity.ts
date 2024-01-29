import { BaseModel } from 'src/models/baseModel';
import { Column, Entity } from 'typeorm';

@Entity()
export class Image extends BaseModel {
  @Column({ length: 500 })
  src: string;

  @Column({ length: 250 })
  alt: string;
}
