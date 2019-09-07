import { When } from "./types/When";
import { trueMethod } from "./trueMethod";
import dynamicWhen from "./dynamic/dynamicWhen";

const getWhen = (): When => {

  const whenFactory = dynamicWhen as When;

  whenFactory.true = trueMethod;

  return whenFactory;
};

const when = getWhen();

export default when;
