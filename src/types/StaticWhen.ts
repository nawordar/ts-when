import { StaticTrue, StaticNotNull, StaticElse } from "./StaticMethods";

export interface StaticWhen<T> {

  /** Tests assertion and returns _value_ if assertion is true. */
  true: StaticTrue<T>;

  notNull: StaticNotNull<T>;

  else: StaticElse<T>;
}
