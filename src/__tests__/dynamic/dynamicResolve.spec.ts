import { dynamicResolve } from "../../dynamic/dynamicResolve";
import { DynamicWhenOrElse } from "../../types/DynamicWhen";

describe("dynamicResolve", () => {
  const isDynamicResolveObject = (resolve: any): resolve is DynamicWhenOrElse<any, any> =>
    resolve != null
    && typeof resolve.is === "function"
    && typeof resolve.match === "function"
    && typeof resolve.true === "function"
    && typeof resolve.notNull === "function"
    && typeof resolve.else === "function";

  it("should return itself", () => {
    const dynamicResolveObject = dynamicResolve("value", "arg");

    expect(isDynamicResolveObject(dynamicResolveObject)).toBe(true);
    expect(isDynamicResolveObject(dynamicResolveObject.is({}, {}))).toBe(true);
    expect(isDynamicResolveObject(dynamicResolveObject.match(/test/, "test"))).toBe(true);
    expect(isDynamicResolveObject(dynamicResolveObject.true(true, {}))).toBe(true);
    expect(isDynamicResolveObject(dynamicResolveObject.notNull({}))).toBe(true);
  });

  it("should return resolved value", () => {
    const dynamicResolveReturn = dynamicResolve("value").else("value");

    expect(dynamicResolveReturn).toBe("value");
  });
});
