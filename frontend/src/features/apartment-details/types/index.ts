export interface PaymentPlan {
  id: number;
  downPaymentPct: number | null;
  termMonths: number | null;
  installmentAmount: number | null;
  installmentFrequency: string | null;
}

export interface ApartmentDetail {
  id: number;
  referenceNo: string;
  title: string;
  description: string | null;
  price: number | null;
  currency: string;
  areaSqm: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  status: string | null;
  saleType: string | null;
  finishing: string | null;
  deliveryDate: string | null;
  maintenanceFee: number | null;
  mapLat: number | null;
  mapLng: number | null;
  compound: string | null;
  area: string | null;
  developer: string | null;
  amenities: string[];
  imageUrl: string;
  paymentPlans: PaymentPlan[];
}
