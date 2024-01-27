import { Auditable } from 'src/models/auditable';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';

@Entity()
export class Book extends Auditable {
  @Column()
  name: string;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'imageId' })
  img: Image;

  @Column()
  publisher: string;

  @Column()
  author: string;

  @Column({ type: 'date' })
  year: Date;

  @Column()
  language: string;

  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
