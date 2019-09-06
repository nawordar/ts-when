export interface Matcher<T, R extends T> {
    test: ((x: T) => x is R) | ((x: T) => boolean);
}
