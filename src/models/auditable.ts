import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../modules/auth/users/entities/user.entity';
import { BaseModel } from './baseModel';

type ActiveStatus = 0 | 1;

@Entity()
export abstract class Auditable extends BaseModel {
  @Column({ type: 'tinyint', width: 1, default: 1 })
  active: ActiveStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'deletedByUserId' })
  deletedByUser: User;

  @Column({ type: 'timestamp', nullable: true })
  updateAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleteAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updatedByUserId' })
  updatedByUser: User;
}
