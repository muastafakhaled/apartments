import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { FilterRangesResponse } from './filter-ranges.response';

/**
 * Owns the cache lifecycle for the filter ranges: the key, the TTL, and
 * invalidation. Kept separate so the read handler stays a pure query and the
 * create handler can evict without either knowing the key.
 *
 * Default in-memory store; swap CacheModule for Redis to share across instances.
 */
@Injectable()
export class FilterRangesCache {
  private static readonly KEY = 'apartments:filter-ranges';
  private static readonly TTL_MS = 60_000;

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  get(): Promise<FilterRangesResponse | null> {
    return this.cache.get<FilterRangesResponse>(FilterRangesCache.KEY);
  }

  async set(value: FilterRangesResponse): Promise<void> {
    await this.cache.set(FilterRangesCache.KEY, value, FilterRangesCache.TTL_MS);
  }

  async invalidate(): Promise<void> {
    await this.cache.del(FilterRangesCache.KEY);
  }
}
