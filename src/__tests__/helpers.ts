export type IsSubtype<T, S> = S extends T ? true : false;

export type IsType<T, S> = S extends T ? (T extends S ? true : false) : false;

// tslint:disable-next-line: no-empty
export const StaticCheck = <_T extends true>() => { };
