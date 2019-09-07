import { True } from "../types/True";
import { resolve } from "./resolve";
import { isCallable } from "../types/Callable";

export const trueImpl = <T>(
    assertion: (() => boolean) | boolean,
    returns: (() => T) | T): True<T> =>
    (typeof assertion === "function" ? assertion() : assertion)
        ? resolve(typeof returns === "function" ? (returns as (() => any))() : returns)
        : ({

            true: trueImpl,

            // tslint:disable-next-line: no-shadowed-variable
            else: (returns) =>
                isCallable(returns)
                    ? returns()
                    : returns,
        });
