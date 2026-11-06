/**
 * Represents a successful computation outcome.
 */
export type Success<T> = {
  readonly ok: true;
  readonly value: T;
};

/**
 * Represents a failed computation outcome without throwing an exception.
 */
export type Failure<E = Error> = {
  readonly ok: false;
  readonly error: E;
};

/**
 * Discriminated Union for railway-oriented error handling.
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Deterministic state machine union for asynchronous operations.
 * Eliminates impossible states (e.g., `isLoading: true` while `error` is also set).
 */
export type AsyncState<T, E = Error> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly error: E };

export const ok = <T>(value: T): Success<T> => ({
  ok: true,
  value,
});

export const err = <E>(error: E): Failure<E> => ({
  ok: false,
  error,
});

export const isOk = <T, E>(result: Result<T, E>): result is Success<T> => {
  return result.ok;
};

export const isErr = <T, E>(result: Result<T, E>): result is Failure<E> => {
  return !result.ok;
};

export const unwrapOr = <T, E>(result: Result<T, E>, fallback: T): T => {
  return result.ok ? result.value : fallback;
};

export const mapResult = <T, U, E>(
  result: Result<T, E>,
  transform: (value: T) => U
): Result<U, E> => {
  return result.ok ? ok(transform(result.value)) : result;
};
