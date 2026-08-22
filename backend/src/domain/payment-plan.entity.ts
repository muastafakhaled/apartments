import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Apartment } from './apartment.entity';
import { InstallmentFrequency } from './enums';
import { numericTransformer } from '../shared/typeorm/numeric.transformer';

@Entity('payment_plans')
export class PaymentPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  apartmentId: number;

  @ManyToOne(() => Apartment, (apartment) => apartment.paymentPlans, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'apartment_id' })
  apartment: Apartment;

  @Column({
    type: 'numeric',
    precision: 5,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  downPaymentPct: number | null;

  @Column({ type: 'smallint', nullable: true })
  termMonths: number | null;

  @Column({
    type: 'numeric',
    precision: 14,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  installmentAmount: number | null;

  @Column({
    type: 'enum',
    enum: InstallmentFrequency,
    enumName: 'installment_frequency',
    nullable: true,
  })
  installmentFrequency: InstallmentFrequency | null;
}
