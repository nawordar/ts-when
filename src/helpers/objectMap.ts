export const objectMap =
    <T extends Record<string, any>, K extends keyof T, V>(
        object: T,
        callbackfn: (property: T[K], key: string) => V): Record<string, V> =>
        Object.keys(object).reduce((obj, key) =>
            Object.assign(obj, callbackfn(object[key], key)), {}) as Record<string, V>;
