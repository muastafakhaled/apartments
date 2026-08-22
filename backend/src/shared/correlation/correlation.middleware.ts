import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CorrelationIdProvider } from './correlation-id.provider';
import { resolveTraceId } from './trace-id';

export { TRACE_ID_HEADER } from './trace-id';

/**
 * Owns the request's correlation scope: resolves the trace id and runs the rest
 * of the pipeline inside the async-local store so any downstream code can read
 * it via {@link CorrelationIdProvider.get}. The id itself is minted by the
 * shared {@link resolveTraceId} so it stays identical to pino's `reqId`.
 */
@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const traceId = resolveTraceId(req, res);
    CorrelationIdProvider.run(traceId, () => next());
  }
}
