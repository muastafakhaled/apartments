import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Apartment } from './apartment.entity';

@Entity('amenities')
export class Amenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ManyToMany(() => Apartment, (apartment) => apartment.amenities)
  apartments: Apartment[];
}
