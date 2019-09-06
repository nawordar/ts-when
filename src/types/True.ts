export interface True<T> {

  /** Tests assertion and returns _value_ if assertion is true. */
  true: <U>(assertion: (() => boolean) | boolean, value: (() => U) | U) => True<T | U>;
  else: <U>(returnValue: (() => U) | U) => T | U;
}
