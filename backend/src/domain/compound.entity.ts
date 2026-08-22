import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from './area.entity';
import { Developer } from './developer.entity';
import { Apartment } from './apartment.entity';
import { numericTransformer } from '../shared/typeorm/numeric.transformer';

@Entity('compounds')
export class Compound {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Index()
  @Column({ nullable: true })
  areaId: number | null;

  @ManyToOne(() => Area, (area) => area.compounds, { nullable: true })
  @JoinColumn({ name: 'area_id' })
  area: Area | null;

  @Index()
  @Column({ nullable: true })
  developerId: number | null;

  @ManyToOne(() => Developer, (developer) => developer.compounds, {
    nullable: true,
  })
  @JoinColumn({ name: 'developer_id' })
  developer: Developer | null;

  @Column({
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  developerStartPrice: number | null;

  @Column({
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  resaleStartPrice: number | null;

  @OneToMany(() => Apartment, (apartment) => apartment.compound)
  apartments: Apartment[];
}
