import { StaticTrue, StaticNotNull, StaticElse } from "./StaticMethods";

export interface StaticWhen<T> {

  /** Checks if a given assertion is true */
  true: StaticTrue<T>;

  /** Checks if an object is neither null nor undefined */
  notNull: StaticNotNull<T>;

  /** Returns value if all the previous checks failed */
  else: StaticElse<T>;
}
