import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { http } from "@/shared/api/http-client";
import { BaseResponse } from "@/shared/api/types";
import { ListApartmentsParams, ListApartmentsResponse } from "../types";

export const listApartmentsKey = (params: ListApartmentsParams) =>
  ["apartments", "list", params] as const;

async function fetchApartments(
  params: ListApartmentsParams,
  signal?: AbortSignal,
): Promise<ListApartmentsResponse> {
  const res = await http.get<BaseResponse<ListApartmentsResponse>>(
    "/apartments",
    { params, signal },
  );
  return res.data.data as ListApartmentsResponse;
}

export function useListApartments(params: ListApartmentsParams) {
  return useQuery({
    queryKey: listApartmentsKey(params),
    queryFn: ({ signal }) => fetchApartments(params, signal),
    placeholderData: keepPreviousData,
  });
}
