import { DynamicWhen } from "./DynamicWhen";
import { StaticWhen } from "./StaticWhen";
import { StaticTrue, StaticNotNull } from "./StaticMethods";

export interface When {

  /** Tests an object against multiple expressions and returns the result. */
  <T>(expr: T): DynamicWhen<T, never>;

  /** Tests assertion and returns _value_ if assertion is true. */
  true: StaticTrue<never>;

  notNull: StaticNotNull<never>;
}
