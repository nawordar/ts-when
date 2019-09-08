import { StaticWhen } from "../types/StaticWhen";
import { staticElse, staticNotNull, staticTrue } from "./staticMethods";

export const staticWhen = <T>(): StaticWhen<T> => ({

    true: staticTrue,

    notNull: staticNotNull,

    else: staticElse,

});
