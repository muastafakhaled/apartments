import Image from "next/image";
import Link from "next/link";
import { MapPinIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { AreaIcon, BathIcon, BedIcon } from "@/shared/components/spec-icons";
import {
  formatArea,
  formatDeliveryDate,
  formatPrice,
} from "@/shared/lib/format";
import { ApartmentListItem } from "../types";

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-sm text-foreground">
      <span className="text-muted">{icon}</span>
      {value}
    </span>
  );
}

export function ApartmentCard({ apartment }: { apartment: ApartmentListItem }) {
  const location = [apartment.compound, apartment.area]
    .filter(Boolean)
    .join(", ");
  const area = formatArea(apartment.areaSqm);
  const delivery = formatDeliveryDate(apartment.deliveryDate);

  const tags = [apartment.saleType, apartment.finishing].filter(
    Boolean,
  ) as string[];

  return (
    <Link
      href={`/apartments/${apartment.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-md sm:flex-row"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface-muted sm:aspect-auto sm:w-[300px]">
        {apartment.imageUrl ? (
          <Image
            src={apartment.imageUrl}
            alt={apartment.title}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted">
            <PhotoIcon className="h-10 w-10" />
          </div>
        )}
        {apartment.status && (
          <span className="absolute left-3 top-3 rounded-full bg-surface/95 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
            {apartment.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-1">
          {location && (
            <p className="flex items-center gap-1 text-xs text-muted">
              <MapPinIcon className="h-4 w-4 text-primary" />
              {location}
            </p>
          )}
          <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
            {apartment.title}
          </h3>
          {apartment.developer && (
            <p className="line-clamp-1 text-sm text-muted">
              {apartment.developer}
            </p>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {apartment.bedrooms != null && (
            <Spec
              icon={<BedIcon className="h-[18px] w-[18px]" />}
              value={`${apartment.bedrooms} Beds`}
            />
          )}
          {apartment.bathrooms != null && (
            <Spec
              icon={<BathIcon className="h-[18px] w-[18px]" />}
              value={`${apartment.bathrooms} Baths`}
            />
          )}
          {area && (
            <Spec
              icon={<AreaIcon className="h-[18px] w-[18px]" />}
              value={area}
            />
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-xs text-muted">Start Price</p>
            <p className="text-lg font-bold text-foreground">
              {formatPrice(apartment.price, apartment.currency)}
            </p>
          </div>
          {delivery && (
            <div className="text-right">
              <p className="text-xs text-muted">Delivery</p>
              <p className="text-sm font-semibold text-foreground">
                {delivery}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
