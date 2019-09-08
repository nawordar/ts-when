import { StaticWhen } from "./StaticWhen";

export type StaticTrue<V> = <W>(
  assertion: (() => boolean) | boolean,
  returns: (() => W) | W,
) => StaticWhen<V | W>;

export type StaticNotNull<V> = <T, W>(
  nullable: (() => T) | T,
  returns: ((matched: NonNullable<T>) => W) | W,
) => StaticWhen<V | W>;

export type StaticElse<V> = <W>(
  returns: (() => W) | W,
) => V | W;
