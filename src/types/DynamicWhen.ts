import { Matcher } from "./Matcher";
import { DynamicWhenOrElse } from "./DynamicWhenOrElse";

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
}
