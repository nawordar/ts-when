import { TypedDynamicWhenOrElse } from "../types/TypedDynamicWhenOrElse";
import { callOrReturn } from "../../types/Callable";

/**
 * Exposes same API as `when`, but just propagates a resolved value,
 * without doing any further test.
 */
export const typedDynamicResolve = (value: any, arg?: any): TypedDynamicWhenOrElse<any, any> => {
    value = callOrReturn(value, arg);

    return {
        is: () => typedDynamicResolve(value, arg),
        match: () => typedDynamicResolve(value, arg),
        true: () => typedDynamicResolve(value, arg),
        else: () => value,
    };
};
