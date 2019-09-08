import { DynamicWhen } from "./DynamicWhen";
import { StaticTrue, StaticNotNull } from "./StaticMethods";

export interface When {

  /** Tests an object against multiple expressions and returns the result. */
  <T>(expr: T): DynamicWhen<T, never>;

  /** Tests assertion and returns value if assertion is true. */
  true: StaticTrue<never>;

  /** Returns value if it is not null */
  notNull: StaticNotNull<never>;
}
