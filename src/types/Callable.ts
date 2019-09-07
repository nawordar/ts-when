export type Callable = (subject?: any) => any;
export const isCallable = (subject: any): subject is Callable => typeof subject === "function";
export const callOrReturn = <T>(subject: ((x?: any) => T) | T, value?: any): T => isCallable(subject)
? subject(value)
    : subject;
