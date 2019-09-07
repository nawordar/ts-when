import { callOrReturn } from "../types/Callable";
import { DynamicWhenOrElse } from "../types/DynamicWhenOrElse";

/**
 * Exposes same API as `when`, but just propagates a resolved value,
 * without doing any further test.
 */
export const dynamicResolve = (value: any, arg?: any): DynamicWhenOrElse<any, any> => {
    value = callOrReturn(value, arg);

    return {
        is: () => dynamicResolve(value, arg),
        match: () => dynamicResolve(value, arg),
        true: () => dynamicResolve(value, arg),
        else: () => value,
    };
};
