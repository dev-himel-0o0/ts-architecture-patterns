import { describe, it, expect, expectTypeOf } from 'vitest';
import {
  ok,
  err,
  isOk,
  isErr,
  unwrapOr,
  mapResult,
  type Result,
  type AsyncState,
} from '../src/primitives/result.js';

function simulateOperation(shouldSucceed: boolean): Result<number, string> {
  return shouldSucceed ? ok(200) : err('ERR_UPSTREAM_TIMEOUT');
}

function getAsyncState(
  phase: 'idle' | 'loading' | 'success' | 'error'
): AsyncState<string> {
  switch (phase) {
    case 'idle':
      return { status: 'idle' };
    case 'loading':
      return { status: 'loading' };
    case 'success':
      return { status: 'success', data: 'payload_ready' };
    case 'error':
      return { status: 'error', error: new Error('Network failure') };
  }
}

describe('Result<T, E> & AsyncState<T, E> Discriminated Unions', () => {
  it('narrows successful payloads safely via type predicates', () => {
    const res = simulateOperation(true);

    expect(isOk(res)).toBe(true);
    if (isOk(res)) {
      expectTypeOf(res.value).toEqualTypeOf<number>();
      expect(res.value).toBe(200);
    }
  });

  it('narrows failure states and falls back cleanly on unwrapOr', () => {
    const res = simulateOperation(false);

    expect(isErr(res)).toBe(true);
    if (isErr(res)) {
      expectTypeOf(res.error).toEqualTypeOf<string>();
      expect(res.error).toBe('ERR_UPSTREAM_TIMEOUT');
    }

    expect(unwrapOr(res, 500)).toBe(500);
  });

  it('transforms ok values via mapResult while preserving error states', () => {
    const successMapped = mapResult(
      simulateOperation(true),
      (code) => `HTTP_${String(code)}`
    );
    expect(unwrapOr(successMapped, 'FALLBACK')).toBe('HTTP_200');

    const errorMapped = mapResult(
      simulateOperation(false),
      (code) => `HTTP_${String(code)}`
    );
    expect(isErr(errorMapped)).toBe(true);
  });

  it('enforces deterministic narrowing across AsyncState transitions', () => {
    const current = getAsyncState('success');

    expect(current.status).toBe('success');
    if (current.status === 'success') {
      expectTypeOf(current.data).toEqualTypeOf<string>();
      expect(current.data).toBe('payload_ready');
    }
  });
});
