import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/api/http-client";
import { BaseResponse } from "@/shared/api/types";

export interface RangeBound {
  min: number | null;
  max: number | null;
}

export interface FilterRanges {
  price: RangeBound;
  area: RangeBound;
  bedrooms: RangeBound;
  bathrooms: RangeBound;
}

export const filterRangesKey = ["apartments", "filters"] as const;

async function fetchFilterRanges(signal?: AbortSignal): Promise<FilterRanges> {
  const res = await http.get<BaseResponse<FilterRanges>>("/apartments/filters", {
    signal,
  });
  return res.data.data as FilterRanges;
}

/**
 * Filter bounds are effectively static, so fetch them once and never refetch —
 * changing the list filters must not re-request them.
 */
export function useFilterRanges() {
  return useQuery({
    queryKey: filterRangesKey,
    queryFn: ({ signal }) => fetchFilterRanges(signal),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
