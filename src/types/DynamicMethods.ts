import { DynamicWhenOrElse } from "./DynamicWhen";
import { Matcher } from "./Matcher";

export type DynamicIs<T, V> = <U extends T, W>(
  matcher: U,
  value: ((inputValue: U) => W) | W,
) => DynamicWhenOrElse<T, V | W>;

export type DynamicMatch<T, V> = <U extends T, W>(
  matcher: Matcher<T, U>,
  value: ((inputValue: U) => W) | W,
) => DynamicWhenOrElse<T, V | W>;

export type DynamicTrue<T, V> = <W>(
  assertion: (() => boolean) | boolean,
  value: (() => W) | W,
) => DynamicWhenOrElse<T, V | W>;

export type DynamicNotNull<T, V> = <U extends T, W>(
  returns: ((matched: NonNullable<U>) => W) | W,
) => DynamicWhenOrElse<T, V | W>;

export type DynamicElse<T, V> = <W>(
  returns: ((matched: T) => W) | W,
) => V | W;
