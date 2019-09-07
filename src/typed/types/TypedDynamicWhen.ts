import { Matcher } from "../../types/Matcher";
import { TypedDynamicWhenOrElse } from "./TypedDynamicWhenOrElse";

export interface TypedDynamicWhen<S, T> {
  is: <U extends S>(
    that: U,
    returns: ((matched: U) => T) | T,
  ) => TypedDynamicWhenOrElse<S, T>;

  match: <U extends S>(
    that: Matcher<S, U>,
    returns: ((matched: U) => T) | T,
  ) => TypedDynamicWhenOrElse<S, T>;

  true: (
    assertion: (() => boolean) | boolean,
    returns: (() => T) | T,
  ) => TypedDynamicWhenOrElse<S, T>;
}
