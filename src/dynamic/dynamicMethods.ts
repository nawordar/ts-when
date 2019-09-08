import { dynamicResolve } from "./dynamicResolve";
import { callOrReturn } from "../helpers";
import dynamicWhen from "./dynamicWhen";
import { Matcher } from "../types/Matcher";
import dynamicWhenOrElse from "./dynamicWhenOrElse";

export const dynamicIs = <T, U extends T, W>(subject: T) => (
    that: U,
    returns: ((matched: U) => W) | W,
) => subject === that
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicMatch = <T, U extends T, W>(subject: T) => (
    that: Matcher<T, U>,
    returns: ((matched: U) => W) | W,
) => that.test(subject)
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicTrue = <T, W>(subject: T) => (
    assertion: (() => boolean) | boolean,
    returns: (() => W) | W,
) => callOrReturn(assertion)
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicNotNull = <T, U extends T, W>(subject: T) => (
    returns: ((matched: NonNullable<U>) => W) | W,
) => callOrReturn(subject) != null
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicElse = <T, U extends T, W>(subject: T) => (
    returns: ((matched: U) => W) | W,
) => callOrReturn(returns, subject);
