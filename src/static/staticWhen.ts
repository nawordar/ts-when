import { StaticWhen } from "../types/StaticWhen";
import { staticTrue, staticNotNull, staticElse } from "./staticMethods";

export const staticWhen = <T>(): StaticWhen<T> => ({

    true: staticTrue,

    notNull: staticNotNull,

    else: staticElse,

});
