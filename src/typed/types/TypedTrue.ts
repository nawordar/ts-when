import { TypedStaticWhen } from "./TypedStaticWhen";

export interface TypedTrue<T> extends TypedStaticWhen<T> {

    else: (returns: (() => T) | T) => T;
}
