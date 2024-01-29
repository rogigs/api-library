import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('idx_email', { unique: true })
  @Column()
  email: string;

  @Column({ length: 30 })
  password: string;

  toJSON() {
    return { id: this.id, email: this.email };
  }
}
