import { WhenInstance } from "../types/WhenInstance";
import { dynamicIs, dynamicMatch, dynamicTrue, dynamicElse } from "./dynamicMethods";

/**
 * Tests an object against multiple expressions.
 */
export const when = <T>(subject: T): WhenInstance<T, never> => ({

    is: dynamicIs(subject),

    match: dynamicMatch(subject),

    true: dynamicTrue(subject),

    else: dynamicElse(subject),
});

export default when;
