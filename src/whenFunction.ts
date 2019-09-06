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

/**
 * Tests an object against multiple expressions.
 */
export const whenFunction = <T>(expr: T): WhenInstance<T, never> => ({
  is: (constExpr, value) =>
    expr === constExpr
      ? resolve(typeof value === "function" ? (value as (x: any) => any)(constExpr) : value)
      : whenFunction(expr),

  match: (matcher, value) =>
    matcher.test(expr)
      ? resolve(typeof value === "function" ? (value as (x: any) => any)(expr) : value)
      : whenFunction(expr),

  true: (assertion, value) =>
    (typeof assertion === "function" ? assertion() : assertion)
      ? resolve(typeof value === "function" ? (value as (() => any))() : value)
      : whenFunction(expr),

  else: (defaultValue) =>
    typeof defaultValue === "function" ? (defaultValue as (x: any) => any)(expr) : defaultValue,
});

export default whenFunction;
