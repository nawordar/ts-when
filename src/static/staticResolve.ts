import { True } from "../types/True";
import { callOrReturn } from "../types/Callable";

/**
 * Exposes same API as `true`, but just propagates a resolved value,
 * without doing any further test.
 */
export const staticResolve = (value: any, arg?: any): True<any> => {
    value = callOrReturn(value, arg);

    return {
        true: () => staticResolve(value, arg),
        else: () => value,
    };
};
