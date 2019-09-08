import { DynamicWhen } from "../types/DynamicWhen";
import { dynamicIs, dynamicMatch, dynamicTrue } from "./dynamicMethods";

/**
 * Tests an object against multiple expressions.
 */
export const dynamicWhen = <T>(subject: T): DynamicWhen<T, never> => ({
    is: dynamicIs(subject),
    match: dynamicMatch(subject),
    true: dynamicTrue(subject),
});

export default dynamicWhen;
