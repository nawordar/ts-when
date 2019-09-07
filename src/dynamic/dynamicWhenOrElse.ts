import { dynamicIs, dynamicMatch, dynamicTrue, dynamicElse } from "./dynamicMethods";
import { DynamicWhenOrElse } from "../types/DynamicWhenOrElse";

/**
 * Tests an object against multiple expressions.
 */
export const dynamicWhenOrElse = <T>(subject: T): DynamicWhenOrElse<T, never> => ({

    is: dynamicIs(subject),

    match: dynamicMatch(subject),

    true: dynamicTrue(subject),

    else: dynamicElse(subject),
});

export default dynamicWhenOrElse;
