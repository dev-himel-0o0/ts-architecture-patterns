export type Success<T> = {
  readonly ok: true;
  readonly value: T;
};

export type Failure<E = Error> = {
  readonly ok: false;
  readonly error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

export const ok = <T>(value: T): Success<T> => ({
  ok: true,
  value,
});

export const err = <E>(error: E): Failure<E> => ({
  ok: false,
  error,
});

export const unwrapOr = <T, E>(result: Result<T, E>, fallback: T): T => {
  return result.ok ? result.value : fallback;
};
