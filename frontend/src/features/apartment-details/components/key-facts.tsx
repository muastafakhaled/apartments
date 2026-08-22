import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { AreaIcon, BathIcon, BedIcon } from "@/shared/components/spec-icons";
import { formatArea, formatDeliveryDate } from "@/shared/lib/format";
import { ApartmentDetail } from "../types";

export function KeyFacts({ apartment }: { apartment: ApartmentDetail }) {
  const facts: { icon: React.ReactNode; label: string; value: string }[] = [];

  if (apartment.bedrooms != null) {
    facts.push({
      icon: <BedIcon className="h-5 w-5" />,
      label: "Bedrooms",
      value: `${apartment.bedrooms}`,
    });
  }
  if (apartment.bathrooms != null) {
    facts.push({
      icon: <BathIcon className="h-5 w-5" />,
      label: "Bathrooms",
      value: `${apartment.bathrooms}`,
    });
  }
  const area = formatArea(apartment.areaSqm);
  if (area) {
    facts.push({
      icon: <AreaIcon className="h-5 w-5" />,
      label: "Area",
      value: area,
    });
  }
  if (apartment.floor != null) {
    facts.push({
      icon: <BuildingOffice2Icon className="h-5 w-5" />,
      label: "Floor",
      value: `${apartment.floor}`,
    });
  }
  if (apartment.finishing) {
    facts.push({
      icon: <SparklesIcon className="h-5 w-5" />,
      label: "Finishing",
      value: apartment.finishing,
    });
  }
  const delivery = formatDeliveryDate(apartment.deliveryDate);
  if (delivery) {
    facts.push({
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      label: "Delivery",
      value: delivery,
    });
  }

  if (facts.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface p-5 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-muted text-primary">
            {fact.icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted">{fact.label}</p>
            <p className="truncate text-sm font-semibold text-foreground">
              {fact.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
