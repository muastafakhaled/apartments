import { randomUUID } from 'node:crypto';
import { IncomingMessage, ServerResponse } from 'node:http';

export const TRACE_ID_HEADER = 'x-request-id';

/**
 * Single source for a request's trace id: honor an inbound header (so ids span
 * service hops), otherwise mint one, and echo it on the response. Idempotent —
 * whichever request hook runs first (the correlation middleware or pino's
 * genReqId) sets the id; the other reads the same value back.
 */
export function resolveTraceId(
  req: IncomingMessage,
  res: ServerResponse,
): string {
  const existing = req.headers[TRACE_ID_HEADER];
  const id =
    (Array.isArray(existing) ? existing[0] : existing)?.trim() || randomUUID();

  req.headers[TRACE_ID_HEADER] = id;
  if (!res.headersSent) {
    res.setHeader(TRACE_ID_HEADER, id);
  }
  return id;
}
