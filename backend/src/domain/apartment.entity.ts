import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Amenity } from './amenity.entity';
import { Compound } from './compound.entity';
import { PaymentPlan } from './payment-plan.entity';
import { ApartmentStatus, Currency, Finishing, SaleType } from './enums';
import { numericTransformer } from '../shared/typeorm/numeric.transformer';

@Entity('apartments')
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  referenceNo: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: ApartmentStatus,
    enumName: 'apartment_status',
    default: ApartmentStatus.New,
  })
  status: ApartmentStatus;

  @Index()
  @Column({
    type: 'enum',
    enum: SaleType,
    enumName: 'sale_type',
  })
  saleType: SaleType;

  @Column({
    type: 'enum',
    enum: Finishing,
    enumName: 'finishing',
  })
  finishing: Finishing;

  @Index()
  @Column({
    type: 'numeric',
    precision: 14,
    scale: 2,
    transformer: numericTransformer,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: Currency,
    enumName: 'currency',
    default: Currency.EGP,
  })
  currency: Currency;

  @Index()
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: numericTransformer,
  })
  areaSqm: number;

  @Index()
  @Column({ type: 'smallint' })
  bedrooms: number;

  @Column({ type: 'smallint' })
  bathrooms: number;

  // Ground floor stored as 0; basements are negative.
  @Column({ type: 'smallint' })
  floor: number;

  @Column({ type: 'date', nullable: true })
  deliveryDate: string | null;

  @Index()
  @Column()
  compoundId: number;

  @ManyToOne(() => Compound, (compound) => compound.apartments)
  @JoinColumn({ name: 'compound_id' })
  compound: Compound;

  @Column({
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  maintenanceFee: number | null;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    transformer: numericTransformer,
  })
  mapLat: number;

  @Column({
    type: 'decimal',
    precision: 9,
    scale: 6,
    transformer: numericTransformer,
  })
  mapLng: number;

  @ManyToMany(() => Amenity, (amenity) => amenity.apartments)
  @JoinTable({
    name: 'apartment_amenities',
    joinColumn: { name: 'apartment_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'amenity_id', referencedColumnName: 'id' },
  })
  amenities: Amenity[];

  @OneToMany(() => PaymentPlan, (plan) => plan.apartment, {
    cascade: ['insert'],
  })
  paymentPlans: PaymentPlan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
