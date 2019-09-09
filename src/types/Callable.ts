export type Callable = (subject?: any) => any;
export const isCallable = (subject: any): subject is Callable => typeof subject === "function";
