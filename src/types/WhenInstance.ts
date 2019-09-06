import { Matcher } from "./Matcher";

export interface WhenInstance<T, V> {
  is: <U extends T, W>(
    matcher: U,
    value: ((inputValue: U) => W) | W,
  ) => WhenInstance<T, V | W>;

  match: <U extends T, W>(
    matcher: Matcher<T, U>,
    value: ((inputValue: U) => W) | W,
  ) => WhenInstance<T, V | W>;

  true: <W>(
    assertion: (() => boolean) | boolean,
    value: (() => W) | W,
  ) => WhenInstance<T, V | W>;

  else: <W>(
    returnValue: ((inputValue: T) => W) | W,
  ) => V | W;
}
