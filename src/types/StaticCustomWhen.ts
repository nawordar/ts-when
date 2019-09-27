import { WhenConfig } from "./WhenConfig";
import { StaticCustomWhenOrElse } from "./StaticCustomWhenOrElse";

export type StaticCustomWhen<
    TWhenConfig extends WhenConfig<TSubject, TObject>,
    TSubject = any,
    TObject = any,
    TReturns = never> = {
        [property in keyof (TWhenConfig["static"] & TWhenConfig["hybrid"])]: <R>(
            subject: TSubject,
            object: TObject,
            returns: R,
        ) => StaticCustomWhenOrElse<TWhenConfig, TSubject, TObject, TReturns | R>;
    };

export type StaticCustomWhenOrElse<
    TWhenConfig extends WhenConfig<TSubject, TObject>,
    TSubject,
    TObject,
    TReturns = never>
    = StaticCustomWhen<TWhenConfig, TSubject, TObject, TReturns> & { else: <R>(returns: R) => TReturns | R };

const xd = <TWhenConfig extends WhenConfig<any, any>>(cfg: TWhenConfig) => {

    const dynamic = cfg.dynamic;
    if (dynamic == null) {
        return {} as StaticCustomWhen<TWhenConfig, any, any>;
    }

    const obj = {};

    Object.keys(dynamic).forEach((prop) => {
        Object.assign(obj, dynamic[prop]);
    });

    return obj as StaticCustomWhen<TWhenConfig, any, any>;
};

const conf = {
    static: {
        static: {
            test: (a: any, b: any) => a === b,
        },
    },
    hybrid: {
        hybrid: {
            test: (a: any, b: any) => a === b,
        },
    },
};

const when = xd(conf);
const test = when
    .hybrid("test", "test", "test")
    .else(2);
