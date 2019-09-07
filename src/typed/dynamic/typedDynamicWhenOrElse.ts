import { dynamicIs, dynamicMatch, dynamicTrue, dynamicElse } from "../../dynamic/dynamicMethods";
import { TypedDynamicWhenOrElse } from "../types/TypedDynamicWhenOrElse";

export const typedDynamicWhenOrElse = <S, T>(subject: S): TypedDynamicWhenOrElse<S, T> => ({
    is: dynamicIs(subject),
    match: dynamicMatch(subject),
    true: dynamicTrue(subject),
    else: dynamicElse(subject),
});
