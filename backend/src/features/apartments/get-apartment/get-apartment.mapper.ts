import { Injectable } from '@nestjs/common';
import { Apartment, PaymentPlan } from '../../../domain';
import { MediaUrlService } from '../../../shared/media/media-url.service';
import {
  ApartmentDetailResponse,
  PaymentPlanItem,
} from './get-apartment.response';

@Injectable()
export class ApartmentDetailMapper {
  constructor(private readonly mediaUrl: MediaUrlService) {}

  toResponse(apartment: Apartment): ApartmentDetailResponse {
    const dto = new ApartmentDetailResponse();
    dto.id = apartment.id;
    dto.referenceNo = apartment.referenceNo;
    dto.title = apartment.title;
    dto.description = apartment.description;
    dto.price = apartment.price;
    dto.currency = apartment.currency;
    dto.areaSqm = apartment.areaSqm;
    dto.bedrooms = apartment.bedrooms;
    dto.bathrooms = apartment.bathrooms;
    dto.floor = apartment.floor;
    dto.status = apartment.status;
    dto.saleType = apartment.saleType;
    dto.finishing = apartment.finishing;
    dto.deliveryDate = apartment.deliveryDate;
    dto.maintenanceFee = apartment.maintenanceFee;
    dto.mapLat = apartment.mapLat;
    dto.mapLng = apartment.mapLng;
    dto.compound = apartment.compound?.name ?? null;
    dto.area = apartment.compound?.area?.name ?? null;
    dto.developer = apartment.compound?.developer?.name ?? null;
    dto.amenities = (apartment.amenities ?? []).map((a) => a.name);
    dto.imageUrl = this.mediaUrl.resolve(apartment.imageUrl);
    dto.paymentPlans = (apartment.paymentPlans ?? []).map((p) =>
      this.toPaymentPlan(p),
    );
    return dto;
  }

  private toPaymentPlan(plan: PaymentPlan): PaymentPlanItem {
    const item = new PaymentPlanItem();
    item.id = plan.id;
    item.downPaymentPct = plan.downPaymentPct;
    item.termMonths = plan.termMonths;
    item.installmentAmount = plan.installmentAmount;
    item.installmentFrequency = plan.installmentFrequency;
    return item;
  }
}
