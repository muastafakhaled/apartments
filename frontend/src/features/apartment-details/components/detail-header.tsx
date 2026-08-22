import { MapPinIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "@/shared/lib/format";
import type { ApartmentDetail } from "../types";

export function DetailHeader({
  apartment,
  location,
}: {
  apartment: ApartmentDetail;
  location: string;
}) {
  const eyebrow = [apartment.saleType, apartment.area].filter(Boolean).join(" · ");

  return (
    <div>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
        {apartment.title}
      </h1>
      {location && (
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPinIcon className="h-4 w-4 text-primary" />
          {location}
          {apartment.developer ? ` · ${apartment.developer}` : ""}
        </p>
      )}
      <p className="mt-3 text-2xl font-bold text-primary lg:hidden">
        {formatPrice(apartment.price, apartment.currency)}
      </p>
    </div>
  );
}
