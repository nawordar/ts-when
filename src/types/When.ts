import { DynamicWhen } from "./DynamicWhen";
import { StaticWhen } from "./StaticWhen";

export interface When {

  /** Tests an object against multiple expressions and returns the result. */
  <T>(expr: T): DynamicWhen<T, never>;

  /** Tests assertion and returns _value_ if assertion is true. */
  true: <T>(assertion: (() => boolean) | boolean, returns: (() => T) | T) => StaticWhen<T>;

  notNull: <T, U>(
    nullable: (() => U) | U,
    returns: ((matched: NonNullable<U>) => T) | T,
  ) => StaticWhen<T>;
}
