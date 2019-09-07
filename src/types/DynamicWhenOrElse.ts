import { DynamicWhen } from "./DynamicWhen";

export interface DynamicWhenOrElse<T, V> extends DynamicWhen<T, V> {
  else: <W>(returnValue: ((inputValue: T) => W) | W) => V | W;
}
