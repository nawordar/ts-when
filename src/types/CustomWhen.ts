import { StaticCustomWhen } from "./StaticCustomWhen";
import { WhenConfig } from "./WhenConfig";

export type CustomWhen<TWhenConfig extends WhenConfig> = (() => void) & StaticCustomWhen<TWhenConfig>;
