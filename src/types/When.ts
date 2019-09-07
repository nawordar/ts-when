import { DynamicWhen } from "./DynamicWhen";
import { True } from "./True";

export interface When {

  /** Tests an object against multiple expressions and returns the result. */
  <T>(subject: T): DynamicWhen<T, never>;

  /** Tests assertion and returns _value_ if assertion is true. */
  true: <T>(assertion: (() => boolean) | boolean, returns: (() => T) | T) => True<T>;
}
