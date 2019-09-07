import { True } from "../types/True";

/**
 * Exposes same API as `true`, but just propagates a resolved value,
 * without doing any further test.
 */
export const resolve = (resolvedValue: any): True<any> => ({
    true: () => resolve(resolvedValue),
    else: () => resolvedValue,
});
