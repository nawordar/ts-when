import { TypedStaticWhen } from "../types/TypedStaticWhen";
import { staticTrue } from "../../static/staticMethods";

export const typedStaticWhen = <T>(): TypedStaticWhen<T> => ({
    true: staticTrue,
});
