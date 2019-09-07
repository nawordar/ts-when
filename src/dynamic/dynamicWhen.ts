import { WhenInstance } from "../types/WhenInstance";
import { resolve } from "./resolve";
import { isCallable } from "../types/Callable";
import { is, match, trueImpl, elseImpl } from "./methods";

/**
 * Tests an object against multiple expressions.
 */
export const dynamicWhen = <T>(subject: T): WhenInstance<T, never> => ({

    is: is(subject),

    match: match(subject),

    true: trueImpl(subject),

    else: elseImpl(subject),
});

export default dynamicWhen;
