import { WhenConfig } from "./WhenConfig";
import { CustomWhen } from "./CustomWhen";

export type CustomWhenCreator = <TWhenConfig extends WhenConfig>(config: TWhenConfig) => CustomWhen<TWhenConfig>;
