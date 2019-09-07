import { WhenInstance } from "../types/WhenInstance";

/**
 * Exposes same API as `when`, but just propagates a resolved value,
 * without doing any further test.
 */
export const resolve = (resolvedValue: any): WhenInstance<any, any> => ({
    is: () => resolve(resolvedValue),
    match: () => resolve(resolvedValue),
    true: () => resolve(resolvedValue),
    else: () => resolvedValue,
});
