import { Injectable } from '@nestjs/common';
import { Apartment } from '../../../domain';
import { MediaUrlService } from '../../../shared/media/media-url.service';
import { ApartmentListItem } from './list-apartments.response';

@Injectable()
export class ApartmentListMapper {
  constructor(private readonly mediaUrl: MediaUrlService) {}

  toItem(apartment: Apartment): ApartmentListItem {
    const item = new ApartmentListItem();
    item.id = apartment.id;
    item.referenceNo = apartment.referenceNo;
    item.title = apartment.title;
    item.price = apartment.price;
    item.currency = apartment.currency;
    item.areaSqm = apartment.areaSqm;
    item.bedrooms = apartment.bedrooms;
    item.bathrooms = apartment.bathrooms;
    item.status = apartment.status;
    item.saleType = apartment.saleType;
    item.finishing = apartment.finishing;
    item.deliveryDate = apartment.deliveryDate;
    item.compound = apartment.compound?.name ?? null;
    item.area = apartment.compound?.area?.name ?? null;
    item.developer = apartment.compound?.developer?.name ?? null;
    item.imageUrl = this.mediaUrl.resolve(apartment.imageUrl);
    return item;
  }
}
