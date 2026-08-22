import { Injectable } from '@nestjs/common';
import { randomInt } from 'node:crypto';

/**
 * Generates apartment reference numbers from a Crockford base32 alphabet
 * (ambiguous I/L/O/U dropped) so codes stay human-readable. The unique index on
 * reference_no is the real guard against duplicates; the wide 10-char space just
 * keeps collisions rare enough not to need a retry loop.
 */
@Injectable()
export class ReferenceNoGenerator {
  private static readonly ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  private static readonly LENGTH = 10;

  generate(): string {
    let code = '';
    for (let i = 0; i < ReferenceNoGenerator.LENGTH; i++) {
      code +=
        ReferenceNoGenerator.ALPHABET[
          randomInt(ReferenceNoGenerator.ALPHABET.length)
        ];
    }
    return `NWY-${code}`;
  }
}
