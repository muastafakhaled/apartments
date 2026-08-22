"use client";

import { AxiosError } from "axios";
import { Container } from "@/shared/components/container";
import { Breadcrumb } from "@/shared/components/breadcrumb";
import { useGetApartment } from "../api/get-apartment";
import { Amenities } from "./amenities";
import { BackLink } from "./back-link";
import { ContactCard } from "./contact-card";
import { DetailDescription } from "./detail-description";
import { DetailError } from "./detail-error";
import { DetailHeader } from "./detail-header";
import { DetailHero } from "./detail-hero";
import { DetailSkeleton } from "./detail-skeleton";
import { KeyFacts } from "./key-facts";
import { LocationMap } from "./location-map";
import { PaymentPlans } from "./payment-plans";

export function ApartmentDetailsView({ id }: { id: number }) {
  const { data, isLoading, isError, error } = useGetApartment(id);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (isError || !data) {
    const status = (error as AxiosError | null)?.response?.status;
    return <DetailError notFound={status === 404} />;
  }

  const location = [data.compound, data.area].filter(Boolean).join(", ");

  return (
    <Container className="py-6">
      <div className="flex items-center justify-between gap-4">
        <Breadcrumb
          items={[
            { label: "Apartments for sale", href: "/" },
            { label: data.title },
          ]}
        />
        <BackLink />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <DetailHero image={data.imageUrl} title={data.title} status={data.status} />

          <DetailHeader apartment={data} location={location} />

          <KeyFacts apartment={data} />

          <DetailDescription description={data.description} />

          <Amenities amenities={data.amenities} />

          <PaymentPlans plans={data.paymentPlans} currency={data.currency} />

          <LocationMap lat={data.mapLat} lng={data.mapLng} address={location || null} />
        </div>

        <aside>
          <ContactCard apartment={data} />
        </aside>
      </div>
    </Container>
  );
}
