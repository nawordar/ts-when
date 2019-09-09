import { callOrReturn } from "../helpers";
import { StaticWhen } from "../types/StaticWhen";

/**
 * Exposes same API as `true`, but just propagates a resolved value,
 * without doing any further test.
 */
export const staticResolve = (value: any, arg?: any): StaticWhen<any> => {
    value = callOrReturn(value, arg);

    return {
        true: () => staticResolve(value, arg),
        notNull: () => staticResolve(value, arg),
        else: () => value,
    };
};
