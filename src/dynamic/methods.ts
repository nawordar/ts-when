import { resolve } from "./resolve";
import { isCallable } from "../types/Callable";
import when from "./when";
import { Matcher } from "../types/Matcher";

export const is = <T, U extends T, W>(subject: T) => (
    that: U,
    returns: ((matched: U) => W) | W,
) => subject === that
        ? resolve(isCallable(returns) ? returns(that) : returns)
        : when(subject);

export const match = <T, U extends T, W>(subject: T) => (
    that: Matcher<T, U>,
    returns: ((matched: U) => W) | W,
) => that.test(subject)
        ? resolve(isCallable(returns) ? returns(subject) : returns)
        : when(subject);

export const trueImpl = <T, W>(subject: T) => (
    assertion: (() => boolean) | boolean,
    returns: (() => W) | W,
) => (isCallable(assertion) ? assertion() : assertion)
        ? resolve(isCallable(returns) ? returns() : returns)
        : when(subject);

export const elseImpl = <T, U extends T, W>(subject: T) => (
    returns: ((matched: U) => W) | W,
) => isCallable(returns)
        ? returns(subject)
        : returns;
