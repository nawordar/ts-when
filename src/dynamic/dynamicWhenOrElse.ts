import { DynamicWhenOrElse } from "../types/DynamicWhen";
import { dynamicIs, dynamicMatch, dynamicTrue, dynamicElse, dynamicNotNull } from "./dynamicMethods";

/**
 * Tests an object against multiple expressions.
 */
export const dynamicWhenOrElse = <T>(subject: T): DynamicWhenOrElse<T, never> => ({

    is: dynamicIs(subject),

    match: dynamicMatch(subject),

    true: dynamicTrue(subject),

    notNull: dynamicNotNull(subject),

    else: dynamicElse(subject),
});

export default dynamicWhenOrElse;
