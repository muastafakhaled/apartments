import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

/**
 * Ambient trace id for the current request, held in AsyncLocalStorage. Seeded
 * once per request by {@link CorrelationMiddleware}; downstream code reads it
 * with `get()` instead of threading the id through every call.
 */
export class CorrelationIdProvider {
  private static readonly als = new AsyncLocalStorage<string>();

  static run<T>(traceId: string, fn: () => T): T {
    return CorrelationIdProvider.als.run(traceId, fn);
  }

  static get(): string {
    return CorrelationIdProvider.als.getStore() ?? randomUUID();
  }
}
