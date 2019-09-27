import { StaticCustomWhen } from "./StaticCustomWhen";
import { WhenConfig } from "./WhenConfig";

export type StaticCustomWhenOrElse<
    TWhenConfig extends WhenConfig<TSubject, TObject>,
    TSubject,
    TObject,
    TReturns = never> = StaticCustomWhen<TWhenConfig, TSubject, TObject, TReturns> & {

        else: <R>(returns: R) => TReturns | R,
    };
