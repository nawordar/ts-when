import { True } from "./types/True";
import { When } from "./types/When";

/**
 * Exposes same API as `true`, but just propagates a resolved value,
 * without doing any further test.
 */
const resolveAssertion = (resolvedValue: any): True<any> => ({
    true: () => resolveAssertion(resolvedValue),
    else: () => resolvedValue,
});

export const trueMethod = function <T>(
    this: When,
    assertion: (() => boolean) | boolean,
    value: (() => T) | T): True<T> {

    return (typeof assertion === "function" ? assertion() : assertion)
        ? resolveAssertion(typeof value === "function" ? (value as (() => any))() : value)
        : ({
            true: this.true,
            else: (defaultValue) =>
                typeof defaultValue === "function"
                    ? (defaultValue as (() => any))()
                    : defaultValue,
        });
};
