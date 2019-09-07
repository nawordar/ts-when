import { WhenInstance } from "./types/WhenInstance";

/**
 * Exposes same API as `when`, but just propagates a resolved value,
 * without doing any further test.
 */
const resolve = (resolvedValue: any): WhenInstance<any, any> => ({
  is: () => resolve(resolvedValue),
  match: () => resolve(resolvedValue),
  true: () => resolve(resolvedValue),
  else: () => resolvedValue,
});

type Callable = (inputValue?: any) => any;
const isCallable = (subject: any): subject is Callable => typeof subject === "function";

/**
 * Tests an object against multiple expressions.
 */
export const whenFunction = <T>(expr: T): WhenInstance<T, never> => ({
  is: (constExpr, value) =>
    expr === constExpr
      ? resolve(isCallable(value) ? value(constExpr) : value)
      : whenFunction(expr),

  match: (matcher, value) =>
    matcher.test(expr)
      ? resolve(isCallable(value) ? value(expr) : value)
      : whenFunction(expr),

  true: (assertion, value) =>
    (isCallable(assertion) ? assertion() : assertion)
      ? resolve(isCallable(value) ? value() : value)
      : whenFunction(expr),

  else: (defaultValue) =>
    isCallable(defaultValue)
      ? defaultValue(expr)
      : defaultValue,
});

export default whenFunction;
