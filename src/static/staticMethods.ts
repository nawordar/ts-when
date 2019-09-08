import { callOrReturn } from "../helpers";
import { StaticElse, StaticNotNull, StaticTrue } from "../types/StaticMethods";
import { staticResolve } from "./staticResolve";
import { staticWhen } from "./staticWhen";

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
