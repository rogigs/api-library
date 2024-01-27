import { BaseModel } from 'src/models/baseModel';
import { Column, Entity } from 'typeorm';

@Entity()
export class Category extends BaseModel {
  @Column()
  name: string;
}
