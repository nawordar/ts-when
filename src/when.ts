import { When } from "./types/When";
import dynamicWhen from "./dynamic/dynamicWhen";
import { staticTrue, staticNotNull } from "./static/staticMethods";

const getWhen = (): When => {

  const whenFactory = dynamicWhen as When;

  whenFactory.true = staticTrue;
  whenFactory.notNull = staticNotNull;

  return whenFactory;
};

const when = getWhen();

export default when;
