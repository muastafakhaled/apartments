import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compound } from './compound.entity';

@Entity('developers')
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @OneToMany(() => Compound, (compound) => compound.developer)
  compounds: Compound[];
}
