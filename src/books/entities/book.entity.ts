import { Auditable } from 'src/models/auditable';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Image } from '../../images/entities/image.entity';

@Entity()
export class Book extends Auditable {
  @Column()
  name: string;

  @OneToOne(() => Image)
  @JoinColumn({ name: 'imageId' })
  image: Image;

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
