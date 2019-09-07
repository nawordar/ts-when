import { dynamicResolve } from "./dynamicResolve";
import { isCallable, callOrReturn } from "../types/Callable";
import when from "./dynamicWhen";
import { Matcher } from "../types/Matcher";

export const dynamicIs = <T, U extends T, W>(subject: T) => (
    that: U,
    returns: ((matched: U) => W) | W,
) => subject === that
        ? dynamicResolve(returns, subject)
        : when(subject);

export const dynamicMatch = <T, U extends T, W>(subject: T) => (
    that: Matcher<T, U>,
    returns: ((matched: U) => W) | W,
) => that.test(subject)
        ? dynamicResolve(returns, subject)
        : when(subject);

export const dynamicTrue = <T, W>(subject: T) => (
    assertion: (() => boolean) | boolean,
    returns: (() => W) | W,
) => callOrReturn(assertion)
        ? dynamicResolve(returns, subject)
        : when(subject);

export const dynamicElse = <T, U extends T, W>(subject: T) => (
    returns: ((matched: U) => W) | W,
) => callOrReturn(returns, subject);
