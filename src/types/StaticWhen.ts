export interface StaticWhen<T> {

  /** Tests assertion and returns _value_ if assertion is true. */
  true: <U>(assertion: (() => boolean) | boolean, value: (() => U) | U) => StaticWhen<T | U>;

  notNull: <U>(
    nullable: (() => U) | U,
    returns: ((matched: NonNullable<U>) => T) | T,
  ) => StaticWhen<T | U>;

  else: <U>(returnValue: (() => U) | U) => T | U;
}
