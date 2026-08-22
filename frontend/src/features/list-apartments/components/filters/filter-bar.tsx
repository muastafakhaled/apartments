"use client";

import { formatCompact } from "@/shared/lib/format";
import { useFilterRanges } from "../../api/filter-ranges";
import { buildSteps } from "../../lib/build-steps";
import { LabeledSelect, SelectOption } from "./labeled-select";

const SALE_TYPES = ["Resale", "Developer Sale"];
const FINISHING_TYPES = ["Fully Finished", "Semi-Finished", "Unfinished"];
const STATUSES = ["New", "Launch", "Ready to Move", "Near Delivery"];

export interface FilterValues {
  saleType: string;
  finishing: string;
  status: string;
  minBedrooms: string;
  minBathrooms: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
}

interface FilterBarProps {
  values: FilterValues;
  onChange: (key: keyof FilterValues, value: string) => void;
}

const priceOption = (n: number): SelectOption => ({
  value: String(n),
  label: formatCompact(n),
});

const areaOption = (n: number): SelectOption => ({
  value: String(n),
  label: `${n} m²`,
});

export function FilterBar({ values, onChange }: FilterBarProps) {
  const { data: ranges } = useFilterRanges();

  const priceSteps = buildSteps(ranges?.price).map(priceOption);
  const areaSteps = buildSteps(ranges?.area).map(areaOption);

  const minPlusOptions = (max: number): SelectOption[] =>
    Array.from({ length: Math.max(0, max) }, (_, i) => ({
      value: String(i + 1),
      label: `${i + 1}+`,
    }));

  const bedroomOptions = minPlusOptions(ranges?.bedrooms.max ?? 0);
  const bathroomOptions = minPlusOptions(ranges?.bathrooms.max ?? 0);

  const toOptions = (values: string[]): SelectOption[] =>
    values.map((v) => ({ value: v, label: v }));

  const saleTypeOptions = toOptions(SALE_TYPES);
  const finishingOptions = toOptions(FINISHING_TYPES);
  const statusOptions = toOptions(STATUSES);

  return (
    <div className="flex flex-col gap-4">
      <LabeledSelect
        label="Sale type"
        placeholder="Any"
        value={values.saleType}
        options={saleTypeOptions}
        onChange={(v) => onChange("saleType", v)}
      />
      <LabeledSelect
        label="Status"
        placeholder="Any"
        value={values.status}
        options={statusOptions}
        onChange={(v) => onChange("status", v)}
      />
      <LabeledSelect
        label="Finishing"
        placeholder="Any"
        value={values.finishing}
        options={finishingOptions}
        onChange={(v) => onChange("finishing", v)}
      />
      <div className="grid grid-cols-2 gap-3">
        <LabeledSelect
          label="Bedrooms"
          placeholder="Any"
          value={values.minBedrooms}
          options={bedroomOptions}
          onChange={(v) => onChange("minBedrooms", v)}
        />
        <LabeledSelect
          label="Bathrooms"
          placeholder="Any"
          value={values.minBathrooms}
          options={bathroomOptions}
          onChange={(v) => onChange("minBathrooms", v)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <LabeledSelect
          label="Min price"
          placeholder="No min"
          value={values.minPrice}
          options={priceSteps}
          onChange={(v) => onChange("minPrice", v)}
        />
        <LabeledSelect
          label="Max price"
          placeholder="No max"
          value={values.maxPrice}
          options={priceSteps}
          onChange={(v) => onChange("maxPrice", v)}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <LabeledSelect
          label="Min area"
          placeholder="No min"
          value={values.minArea}
          options={areaSteps}
          onChange={(v) => onChange("minArea", v)}
        />
        <LabeledSelect
          label="Max area"
          placeholder="No max"
          value={values.maxArea}
          options={areaSteps}
          onChange={(v) => onChange("maxArea", v)}
        />
      </div>
    </div>
  );
}
