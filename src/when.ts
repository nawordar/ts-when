import { When } from "./types/When";
import dynamicWhen from "./dynamic/when";
import { trueImpl } from "./static/methods";

const getWhen = (): When => {

  const whenFactory = dynamicWhen as When;

  whenFactory.true = trueImpl;

  return whenFactory;
};

const when = getWhen();

export default when;
