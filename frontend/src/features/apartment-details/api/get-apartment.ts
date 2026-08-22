import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/api/http-client";
import { BaseResponse } from "@/shared/api/types";
import { ApartmentDetail } from "../types";

export const getApartmentKey = (id: number) =>
  ["apartments", "detail", id] as const;

async function fetchApartment(
  id: number,
  signal?: AbortSignal,
): Promise<ApartmentDetail> {
  const res = await http.get<BaseResponse<ApartmentDetail>>(
    `/apartments/${id}`,
    { signal },
  );
  return res.data.data as ApartmentDetail;
}

export function useGetApartment(id: number) {
  return useQuery({
    queryKey: getApartmentKey(id),
    queryFn: ({ signal }) => fetchApartment(id, signal),
    enabled: Number.isFinite(id) && id > 0,
    retry: false,
  });
}
