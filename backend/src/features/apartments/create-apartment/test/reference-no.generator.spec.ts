import { ReferenceNoGenerator } from '../reference-no.generator';

describe('ReferenceNoGenerator', () => {
  const generator = new ReferenceNoGenerator();

  it('produces the NWY-<10 crockford chars> format', () => {
    expect(generator.generate()).toMatch(
      /^NWY-[0-9ABCDEFGHJKMNPQRSTVWXYZ]{10}$/,
    );
  });

  it('never emits ambiguous characters (I, L, O, U)', () => {
    const codes = Array.from({ length: 1000 }, () => generator.generate());
    expect(codes.some((c) => /[ILOU]/.test(c.slice(4)))).toBe(false);
  });

  it('does not collide across a large sample', () => {
    const codes = new Set(
      Array.from({ length: 50_000 }, () => generator.generate()),
    );
    expect(codes.size).toBe(50_000);
  });
});
