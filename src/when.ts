import { When } from "./types/When";
import whenFunction from "./whenFunction";
import { trueMethod } from "./trueMethod";

const getWhen = (): When => {

  const whenFactory = whenFunction as When;

  whenFactory.true = trueMethod;

  return whenFactory;
};

const when = getWhen();

export default when;
