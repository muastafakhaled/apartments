import { formatPrice } from "@/shared/lib/format";
import { ApartmentDetail } from "../types";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

export function ContactCard({ apartment }: { apartment: ApartmentDetail }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24">
      <p className="text-xs text-muted">Price</p>
      <p className="text-2xl font-bold text-foreground">
        {formatPrice(apartment.price, apartment.currency)}
      </p>

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <Row label="Reference" value={apartment.referenceNo} />
        {apartment.saleType && (
          <Row label="Sale type" value={apartment.saleType} />
        )}
        {apartment.maintenanceFee != null && (
          <Row
            label="Maintenance"
            value={formatPrice(apartment.maintenanceFee, apartment.currency)}
          />
        )}
      </div>
    </div>
  );
}
