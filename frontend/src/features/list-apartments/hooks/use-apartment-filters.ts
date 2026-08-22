"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterValues } from "../components/filters/filter-bar";
import { activeFilterCount } from "../components/filters/filter-panel";
import type { ListApartmentsParams } from "../types";

const FILTER_PARAM_KEYS: (keyof FilterValues)[] = [
  "saleType",
  "finishing",
  "status",
  "minBedrooms",
  "minBathrooms",
  "minPrice",
  "maxPrice",
  "minArea",
  "maxArea",
];

function numberParam(value: string): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Filters live in the URL so listings are shareable and survive refresh.
 * This hook is the single reader/writer of those params.
 */
export function useApartmentFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const filterValues: FilterValues = {
    saleType: searchParams.get("saleType") ?? "",
    finishing: searchParams.get("finishing") ?? "",
    status: searchParams.get("status") ?? "",
    minBedrooms: searchParams.get("minBedrooms") ?? "",
    minBathrooms: searchParams.get("minBathrooms") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    minArea: searchParams.get("minArea") ?? "",
    maxArea: searchParams.get("maxArea") ?? "",
  };

  const apiParams: ListApartmentsParams = {
    page,
    saleType: filterValues.saleType || undefined,
    finishing: filterValues.finishing || undefined,
    status: filterValues.status || undefined,
    minBedrooms: numberParam(filterValues.minBedrooms),
    minBathrooms: numberParam(filterValues.minBathrooms),
    minPrice: numberParam(filterValues.minPrice),
    maxPrice: numberParam(filterValues.maxPrice),
    minArea: numberParam(filterValues.minArea),
    maxArea: numberParam(filterValues.maxArea),
  };

  function pushParams(params: URLSearchParams) {
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function setFilter(key: keyof FilterValues, value: string) {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (value) params.set(key, value);
    else params.delete(key);
    pushParams(params);
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    FILTER_PARAM_KEYS.forEach((k) => params.delete(k));
    pushParams(params);
  }

  function goToPage(next: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(next));
    pushParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return {
    filterValues,
    activeCount: activeFilterCount(filterValues),
    page,
    apiParams,
    setFilter,
    clearFilters,
    goToPage,
  };
}
