import { staticResolve } from "../../static/staticResolve";
import { DynamicWhenOrElse } from "../../types/DynamicWhen";
import { StaticWhen } from "../../types/StaticWhen";

describe("staticResolve", () => {
  const isStaticResolveObject = (resolve: any): resolve is StaticWhen<any> =>
    resolve != null
    && typeof resolve.true === "function"
    && typeof resolve.notNull === "function"
    && typeof resolve.else === "function";

  it("should return itself", () => {
    const staticResolveObject = staticResolve("value", "arg");

    expect(isStaticResolveObject(staticResolveObject)).toBe(true);
    expect(isStaticResolveObject(staticResolveObject.true(true, {}))).toBe(true);
    expect(isStaticResolveObject(staticResolveObject.notNull("not null", "not null"))).toBe(true);
  });

  it("should return resolved value", () => {
    const staticResolveReturn = staticResolve("value").else("value");

    expect(staticResolveReturn).toBe("value");
  });
});
