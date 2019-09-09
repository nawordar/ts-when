import { DynamicWhen } from "../types/DynamicWhen";
import { dynamicIs, dynamicMatch, dynamicNotNull, dynamicTrue } from "./dynamicMethods";

/** Tests an object against multiple expressions and returns the result. */
export const dynamicWhen = <T>(subject: T): DynamicWhen<T, never> => ({

    is: dynamicIs(subject),

    match: dynamicMatch(subject),

    true: dynamicTrue(subject),

    notNull: dynamicNotNull(subject),
});

export default dynamicWhen;
