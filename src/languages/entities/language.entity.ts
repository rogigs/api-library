import { BaseModel } from 'src/models/baseModel';
import { Column, Entity } from 'typeorm';

@Entity()
export class Language extends BaseModel {
  @Column({ length: 50 })
  name: string;
}
