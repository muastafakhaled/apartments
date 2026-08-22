export enum ErrorCode {
  Success = "SUCCESS",
  ValidationError = "VALIDATION_ERROR",
  NotFound = "NOT_FOUND",
  Conflict = "CONFLICT",
  UnprocessableEntity = "UNPROCESSABLE_ENTITY",
  InternalError = "INTERNAL_ERROR",
}

/** Envelope wrapping every backend HTTP payload. Mirrors `BaseResponse` on the API. */
export interface BaseResponse<T> {
  data: T | null;
  message: string;
  errorCode: ErrorCode;
  referenceId: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
