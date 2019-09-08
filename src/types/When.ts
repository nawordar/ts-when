import { DynamicWhen } from "./DynamicWhen";
import { StaticNotNull, StaticTrue } from "./StaticMethods";

export interface When {

  /** Tests an object against multiple expressions and returns the result. */
  <T>(expr: T): DynamicWhen<T, never>;

  /** Checks if a given assertion is true */
  true: StaticTrue<never>;

  /** Checks if an object is neither null nor undefined */
  notNull: StaticNotNull<never>;
}
