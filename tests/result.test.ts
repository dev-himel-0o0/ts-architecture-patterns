import { describe, it, expect, expectTypeOf } from 'vitest';
import { ok, err, unwrapOr, type Result } from '../src/primitives/result.js';

function simulateOperation(shouldSucceed: boolean): Result<number, string> {
  return shouldSucceed ? ok(200) : err('ERR_TIMEOUT');
}

describe('Result<T, E> Discriminated Union', () => {
  it('narrows successful payloads safely across union boundaries', () => {
    const res = simulateOperation(true);

    expect(res.ok).toBe(true);
    if (res.ok) {
      expectTypeOf(res.value).toEqualTypeOf<number>();
      expect(res.value).toBe(200);
    }
  });

  it('narrows failure states and returns fallback value on unwrapOr', () => {
    const res = simulateOperation(false);

    expect(res.ok).toBe(false);
    if (!res.ok) {
      expectTypeOf(res.error).toEqualTypeOf<string>();
      expect(res.error).toBe('ERR_TIMEOUT');
    }

    expect(unwrapOr(res, 500)).toBe(500);
  });
});
