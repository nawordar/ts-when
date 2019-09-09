import { callOrReturn } from "../helpers";
import { DynamicElse, DynamicIs, DynamicMatch, DynamicNotNull, DynamicTrue } from "../types/DynamicMethods";
import { dynamicResolve } from "./dynamicResolve";
import dynamicWhenOrElse from "./dynamicWhenOrElse";

export const dynamicIs = <T, W>(subject: T): DynamicIs<T, W> => (
    that,
    returns,
) => subject === that
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicMatch = <T, W>(subject: T): DynamicMatch<T, W> => (
    matcher,
    returns,
) => matcher.test(subject)
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicTrue = <T, W>(subject: T): DynamicTrue<T, W> => (
    assertion,
    returns,
) => callOrReturn(assertion)
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicNotNull = <T, W>(subject: T): DynamicNotNull<T, W> => (
    returns,
) => callOrReturn(subject) != null
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicElse = <T, W>(subject: T): DynamicElse<T, W> => (
    returns,
) => callOrReturn(returns, subject);
