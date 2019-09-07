import { TypedDynamicWhen } from "./TypedDynamicWhen";

export interface TypedDynamicWhenOrElse<S, T> extends TypedDynamicWhen<S, T> {
  else: (returns: ((matched: S) => T) | T) => T;
}
