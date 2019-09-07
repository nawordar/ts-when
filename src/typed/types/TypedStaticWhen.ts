import { TypedTrue } from "./TypedTrue";

export interface TypedStaticWhen<T> {

    /** Tests assertion and returns _value_ if assertion is true. */
    true: (assertion: (() => boolean) | boolean, returns: (() => T) | T) => TypedTrue<T>;
}
