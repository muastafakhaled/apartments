import { RangeBound } from "../api/filter-ranges";

/**
 * Turns a {min, max} bound into a short ascending list of "nice" values for a
 * dropdown. The backend only sends the bounds; the intermediate steps are
 * generated here. Returns [] when there is nothing meaningful to pick.
 */
export function buildSteps(bound: RangeBound | undefined, count = 6): number[] {
  const min = bound?.min;
  const max = bound?.max;
  if (min == null || max == null || min >= max) {
    return min != null ? [min] : [];
  }

  const rough = (max - min) / count;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = Math.max(1, Math.round(rough / magnitude) * magnitude);

  const values = new Set<number>([min]);
  for (let v = Math.ceil(min / step) * step; v < max; v += step) {
    if (v > min) values.add(v);
  }
  values.add(max);

  return [...values].sort((a, b) => a - b);
}
