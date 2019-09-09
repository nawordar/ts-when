import { DynamicElse, DynamicIs, DynamicMatch, DynamicNotNull, DynamicTrue } from "./DynamicMethods";

export interface DynamicWhen<T, V> {

  /** Checks if an object is equal to a given value */
  is: DynamicIs<T, V>;

  /** Checks if an object matches RegExp or custom matcher */
  match: DynamicMatch<T, V>;

  /** Checks if a given assertion is true */
  true: DynamicTrue<T, V>;

  /** Checks if an object is neither null nor undefined */
  notNull: DynamicNotNull<T, V>;
}

export interface DynamicWhenOrElse<T, V> extends DynamicWhen<T, V> {

  /** Returns value if all the previous checks failed */
  else: DynamicElse<T, V>;
}
