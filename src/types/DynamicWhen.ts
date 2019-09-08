import { Matcher } from "./Matcher";

export interface DynamicWhen<T, V> {

  is: <U extends T, W>(
    matcher: U,
    value: ((inputValue: U) => W) | W,
  ) => DynamicWhenOrElse<T, V | W>;

  match: <U extends T, W>(
    matcher: Matcher<T, U>,
    value: ((inputValue: U) => W) | W,
  ) => DynamicWhenOrElse<T, V | W>;

  true: <W>(
    assertion: (() => boolean) | boolean,
    value: (() => W) | W,
  ) => DynamicWhenOrElse<T, V | W>;

  notNull: <U extends T, W>(
    returns: ((matched: NonNullable<U>) => W) | W,
  ) => DynamicWhenOrElse<T, V | W>;
}

export interface DynamicWhenOrElse<T, V> extends DynamicWhen<T, V> {

  else: <W>(
    returns: ((matched: T) => W) | W,
  ) => V | W;
}
