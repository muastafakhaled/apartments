import { ValueTransformer } from 'typeorm';

/**
 * Postgres NUMERIC/DECIMAL is returned as a string by the pg driver to avoid
 * precision loss. For the value ranges in this domain (prices, areas, coords)
 * JS numbers are safe, so we surface them as numbers at the entity boundary.
 */
export class NumericTransformer implements ValueTransformer {
  to(value?: number | null): number | null | undefined {
    return value;
  }

  from(value?: string | null): number | null {
    return value === null || value === undefined ? null : Number(value);
  }
}

export const numericTransformer = new NumericTransformer();
