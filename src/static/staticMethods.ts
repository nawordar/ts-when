import { staticResolve } from "./staticResolve";
import { callOrReturn } from "../helpers";
import { staticWhen } from "./staticWhen";
import { StaticTrue, StaticNotNull, StaticElse } from "../types/StaticMethods";

export const staticTrue: StaticTrue<any> = (
    assertion,
    returns,
) => callOrReturn(assertion)
        ? staticResolve(returns)
        : staticWhen();

export const staticNotNull: StaticNotNull<any> = (
    nullable,
    returns,
) => {
    const resolved = callOrReturn(nullable);

    return resolved != null
        ? staticResolve(returns, resolved)
        : staticWhen();
};

export const staticElse: StaticElse<any> = (
    returns,
) => callOrReturn(returns);
