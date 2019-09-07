import { TypedStaticWhen } from "./TypedStaticWhen";
import { TypedDynamicWhen } from "./TypedDynamicWhen";

export interface TypedWhen {

    /** Tests an object against multiple expressions and returns the result. */
    <T>(): TypedStaticWhen<T>;
    <T, S = any>(subject: S): TypedDynamicWhen<S, T>;

}
