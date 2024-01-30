import { Auditable } from 'src/models/auditable';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';

@Entity()
export class Book extends Auditable {
  @Index('idx_name')
  @Column({ length: 100 })
  name: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'imageId' })
  image: Image;

  @Column({ length: 50 })
  publisher: string;

  @Column({ length: 100 })
  author: string;

  @Column({ length: 4 })
  year: string;

  @Column()
  language: string; // TODO: could be a c entity

  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: string;
}
