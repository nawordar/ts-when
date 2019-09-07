export interface TypedTrue<T> {

    /** Tests assertion and returns _value_ if assertion is true. */
    true: (assertion: (() => boolean) | boolean, returns: (() => T) | T) => TypedTrue<T>;
    else: (returns: (() => T) | T) => T;
}
