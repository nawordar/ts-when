import dynamicWhen from "./dynamic/dynamicWhen";
import { staticNotNull, staticTrue } from "./static/staticMethods";
import { When } from "./types/When";

const getWhen = (): When => {

  const whenFactory = dynamicWhen as When;

  whenFactory.true = staticTrue;
  whenFactory.notNull = staticNotNull;

  return whenFactory;
};

const when = getWhen();

export default when;
