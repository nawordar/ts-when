import { isCallable } from "./types/Callable";

export const callOrReturn = <T>(subject: ((x?: any) => T) | T, value?: any): T =>
    isCallable(subject)
        ? subject(value)
        : subject;
