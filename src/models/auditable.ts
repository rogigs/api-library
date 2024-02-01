import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../modules/auth/users/entities/user.entity';
import { BaseModel } from './baseModel';

type ActiveStatus = 0 | 1;

// Nao esta mostrando as relacoes de User
@Entity()
export abstract class Auditable extends BaseModel {
  @Column({ type: 'tinyint', width: 1, default: 1 })
  active: ActiveStatus;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'createdByUserId', referencedColumnName: 'id' })
  createdByUser: User;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'deletedByUserId', referencedColumnName: 'id' })
  deletedByUser: User;

  @Column({ type: 'timestamp', nullable: true })
  updateAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleteAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  @JoinColumn({ name: 'updatedByUserId', referencedColumnName: 'id' })
  updatedByUser: User;
}
