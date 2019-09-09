import { callOrReturn } from "../helpers";
import { DynamicWhenOrElse } from "../types/DynamicWhen";

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
        notNull: () => dynamicResolve(value, arg),
        else: () => value,
    };
};
