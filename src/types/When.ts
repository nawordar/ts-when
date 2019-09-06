import { WhenInstance } from "./WhenInstance";
import { True } from "./True";

export interface When {

  /** Tests an object against multiple expressions and returns the result. */
  <T>(expr: T): WhenInstance<T, never>;

  /** Tests assertion and returns _value_ if assertion is true. */
  true: <T>(assertion: (() => boolean) | boolean, value: (() => T) | T) => True<T>;
}
