/**
 * Stable, client-facing error codes. Numeric so they survive JSON without
 * relying on string matching, and decoupled from HTTP status (a single status
 * can carry several business meanings). `Success` is always 0.
 */
export enum ErrorCode {
  Success = 0,
  Error = 1,
  Validation = 2,
  NotFound = 3,
  Unauthorized = 4,
  Forbidden = 5,
  Conflict = 6,
}
