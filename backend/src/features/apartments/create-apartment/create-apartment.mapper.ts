import { Injectable } from '@nestjs/common';
import { Amenity, Apartment, Currency, PaymentPlan } from '../../../domain';
import { CreateApartmentRequest } from './create-apartment.request';

@Injectable()
export class CreateApartmentMapper {
  toEntity(request: CreateApartmentRequest): Apartment {
    const apartment = new Apartment();
    apartment.title = request.title;
    apartment.description = request.description;
    apartment.imageUrl = request.imageUrl;
    apartment.saleType = request.saleType;
    apartment.finishing = request.finishing;
    apartment.price = request.price;
    apartment.currency = request.currency ?? Currency.EGP;
    apartment.areaSqm = request.areaSqm;
    apartment.bedrooms = request.bedrooms;
    apartment.bathrooms = request.bathrooms;
    apartment.floor = request.floor;
    apartment.compoundId = request.compoundId;
    apartment.mapLat = request.mapLat;
    apartment.mapLng = request.mapLng;
    apartment.deliveryDate = request.deliveryDate ?? null;
    apartment.maintenanceFee = request.maintenanceFee ?? null;

    // Left unset when omitted so the column default (New) applies.
    if (request.status) apartment.status = request.status;

    return apartment;
  }

  // References existing amenities by id; TypeORM links the join rows without
  // loading the full entities.
  toAmenityRefs(ids: number[] = []): Amenity[] {
    return ids.map((id) => {
      const amenity = new Amenity();
      amenity.id = id;
      return amenity;
    });
  }

  toPaymentPlans(request: CreateApartmentRequest): PaymentPlan[] {
    return (request.paymentPlans ?? []).map((p) => {
      const plan = new PaymentPlan();
      plan.downPaymentPct = p.downPaymentPct ?? null;
      plan.termMonths = p.termMonths ?? null;
      plan.installmentAmount = p.installmentAmount ?? null;
      plan.installmentFrequency = p.installmentFrequency ?? null;
      return plan;
    });
  }
}
