"use client";

import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Container } from "@/shared/components/container";
import { Breadcrumb } from "@/shared/components/breadcrumb";
import { useListApartments } from "../api/list-apartments";
import { useApartmentFilters } from "../hooks/use-apartment-filters";
import { ApartmentList } from "./apartment-list";
import { ApartmentsPagination } from "./apartments-pagination";
import { FilterPanel } from "./filters/filter-panel";
import { MobileFilterSheet } from "./filters/mobile-filter-sheet";

export function ListApartmentsView() {
  const [sheetOpen, setSheetOpen] = useState(false);

  const { filterValues, activeCount, apiParams, setFilter, clearFilters, goToPage } =
    useApartmentFilters();

  const { data, isLoading, isError, error, refetch } = useListApartments(apiParams);

  const total = data?.meta.total ?? 0;

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: "Apartments for sale" }]} />

      <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-3">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Apartments for sale
        </h1>
        {!isLoading && !isError && (
          <span className="text-sm text-muted">
            {total} {total === 1 ? "listing" : "listings"}
          </span>
        )}

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground lg:hidden"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filters
          {activeCount > 0 ? (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-white">
              {activeCount}
            </span>
          ) : null}
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="sticky top-4 hidden w-[280px] shrink-0 rounded-2xl border border-border bg-surface p-5 lg:block">
          <FilterPanel
            values={filterValues}
            onChange={setFilter}
            onClear={clearFilters}
          />
        </aside>

        <div className="min-w-0 flex-1">
          <ApartmentList
            items={data?.items ?? []}
            isLoading={isLoading}
            isError={isError}
            errorMessage={error?.message}
            onRetry={() => refetch()}
          />

          {data && (
            <ApartmentsPagination
              page={data.meta.page}
              totalPages={data.meta.totalPages}
              onChange={goToPage}
            />
          )}
        </div>
      </div>

      <MobileFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        values={filterValues}
        activeCount={activeCount}
        resultCount={total}
        onChange={setFilter}
        onClear={clearFilters}
      />
    </Container>
  );
}
