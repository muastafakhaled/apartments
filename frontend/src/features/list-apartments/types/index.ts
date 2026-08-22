import { PaginationMeta } from "@/shared/api/types";

export interface ApartmentListItem {
  id: number;
  referenceNo: string;
  title: string;
  price: number | null;
  currency: string;
  areaSqm: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  status: string | null;
  saleType: string | null;
  finishing: string | null;
  deliveryDate: string | null;
  compound: string | null;
  area: string | null;
  developer: string | null;
  imageUrl: string;
}

export interface ListApartmentsResponse {
  items: ApartmentListItem[];
  meta: PaginationMeta;
}

export interface ListApartmentsParams {
  page?: number;
  limit?: number;
  saleType?: string;
  finishing?: string;
  status?: string;
  minBedrooms?: number;
  minBathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
}
