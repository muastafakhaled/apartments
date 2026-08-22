const intFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/** "3.5M" — short form for dense UI like filter dropdowns. */
export function formatCompact(value: number): string {
  return compactFormatter.format(value);
}

/** "9,262,500 EGP", or a friendly fallback when the price is missing. */
export function formatPrice(
  value: number | null | undefined,
  currency = "EGP",
): string {
  if (value == null) return "Price on request";
  return `${intFormatter.format(value)} ${currency}`;
}

export function formatArea(value: number | null | undefined): string | null {
  if (value == null) return null;
  return `${intFormatter.format(value)} m²`;
}

/** ISO date -> "Dec 2028". Returns null when absent. */
export function formatDeliveryDate(
  value: string | null | undefined,
): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
