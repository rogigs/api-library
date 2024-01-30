import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class BaseModel {
  @Index('idx_id')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
