import { CustomWhenCreator } from "./types/CustomWhenCreator";
import { WhenConfig } from "./types/WhenConfig";
import { objectMap } from "./helpers/objectMap";

export const customWhen: CustomWhenCreator =
    <TWhenConfig extends WhenConfig>({ dynamic, static: staticProps = {}, hybrid }: TWhenConfig) => {

        const dynamicWhen = () => { };

        const staticWhen = objectMap(staticProps, (property) =>
            (subject: Parameters<typeof property["test"]>[0],
             object: Parameters<typeof property["test"]>[1],
             returns: any) => { },

        );
    };
