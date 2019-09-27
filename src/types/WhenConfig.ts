export interface WhenConfig<TSubject = any, TObject = any> {

    dynamic?: {
        [property: string]: {
            test: (subject: TSubject, object: TObject, returns: any) => boolean;
        },
    };

    static?: {
        [property: string]: {
            test: (subject: TSubject, object: TObject, returns: any) => boolean;
        },
    };

    hybrid?: {
        [property: string]: {
            test: (subject: TSubject, object: TObject, returns: any) => boolean;
        },
    };
}
