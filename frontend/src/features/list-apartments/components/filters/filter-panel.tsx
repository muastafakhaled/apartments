"use client";

import { FilterBar, FilterValues } from "./filter-bar";

export function activeFilterCount(values: FilterValues): number {
  return Object.values(values).filter(Boolean).length;
}

interface FilterPanelProps {
  values: FilterValues;
  onChange: (key: keyof FilterValues, value: string) => void;
  onClear: () => void;
  hideHeading?: boolean;
}

export function FilterPanel({
  values,
  onChange,
  onClear,
  hideHeading,
}: FilterPanelProps) {
  const active = activeFilterCount(values);

  return (
    <div>
      {!hideHeading && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Filters</h2>
          {active > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-sm font-medium text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <FilterBar values={values} onChange={onChange} />
    </div>
  );
}
