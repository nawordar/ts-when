import { TypedDynamicWhen } from "../types/TypedDynamicWhen";
import { dynamicIs, dynamicMatch, dynamicTrue } from "../../dynamic/dynamicMethods";

export const typedDynamicWhen = <S, T>(subject: S): TypedDynamicWhen<S, T> => ({
    is: dynamicIs(subject),
    match: dynamicMatch(subject),
    true: dynamicTrue(subject),
});
