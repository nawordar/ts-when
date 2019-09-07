import { When } from "./types/When";
import dynamicWhen from "./dynamic/dynamicWhen";
import { staticTrue } from "./static/staticMethods";

const getWhen = (): When => {

  const whenFactory = dynamicWhen as When;

  whenFactory.true = staticTrue;

  return whenFactory;
};

const when = getWhen();

export default when;
