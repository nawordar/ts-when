import { True } from "../types/True";
import { staticResolve } from "./staticResolve";
import { callOrReturn } from "../types/Callable";

export const staticTrue = <T>(
    assertion: (() => boolean) | boolean,
    returns: (() => T) | T,
): True<T> =>
    callOrReturn(assertion)
        ? staticResolve(returns)
        : ({

            true: staticTrue,

            // tslint:disable-next-line: no-shadowed-variable
            else: (returns) => callOrReturn(returns),
        });
