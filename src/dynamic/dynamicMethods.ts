import { dynamicResolve } from "./dynamicResolve";
import { callOrReturn } from "../helpers";
import dynamicWhenOrElse from "./dynamicWhenOrElse";
import { DynamicIs, DynamicMatch, DynamicTrue, DynamicNotNull, DynamicElse } from "../types/DynamicMethods";

export const dynamicIs = <T, W>(subject: T): DynamicIs<T, W> => (
    that,
    returns,
) => subject === that
        ? dynamicResolve(returns, subject)
        : dynamicWhenOrElse(subject);

export const dynamicMatch = <T, W>(subject: T): DynamicMatch<T, W> => (
    that,
    returns,
) => that.test(subject)
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
