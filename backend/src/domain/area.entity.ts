import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Compound } from './compound.entity';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @OneToMany(() => Compound, (compound) => compound.area)
  compounds: Compound[];
}
