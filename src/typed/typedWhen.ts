import { TypedWhen } from "./types/TypedWhen";
import { typedStaticWhen } from "./static/typedStaticWhen";
import { typedDynamicWhen } from "./dynamic/typedDynamicWhen";

export const typedWhen: TypedWhen = <T, S = any>(subject?: S): any => {
    if (typeof subject === "undefined") {
        return typedStaticWhen<S>();
    } else {
        return typedDynamicWhen<S, T>(subject);
    }
};
