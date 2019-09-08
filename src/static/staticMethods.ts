import { staticResolve } from "./staticResolve";
import { callOrReturn, isNotNull } from "../helpers";
import { staticWhen } from "./staticWhen";

export const staticTrue = <W>(
    assertion: (() => boolean) | boolean,
    returns: (() => W) | W,
) => callOrReturn(assertion)
        ? staticResolve(returns)
        : staticWhen();

export const staticNotNull = <T, W>(
    nullable: (() => T) | T,
    returns: ((matched: NonNullable<T>) => W) | W,
) => {
    const resolved = callOrReturn(nullable);

    return resolved != null
        ? staticResolve(returns, resolved)
        : staticWhen();
};

export const staticElse = <W>(
    returns: (() => W) | W,
) => callOrReturn(returns);
