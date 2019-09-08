import when from "../../when";
import { IsType, StaticCheck } from "../helpers";

describe("'when.true' syntax with a simple return type", () => {
  const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina"): number =>
    when
      .true(() => drink === "Coke", 1.5)
      .true(() => drink === "Pepsi", 1.8)
      .else(2.0);

  it("should return value if assertion is true", () => {
    expect(getDrinkPrice("Coke")).toEqual(1.5);
    expect(getDrinkPrice("Pepsi")).toEqual(1.8);
  });

  it("should return default value if any of assertions is true", () => {
    expect(getDrinkPrice("Orangina")).toEqual(2.0);
  });
});

describe("'when.true' syntax with a union return-type", () => {
  const getDrinkPrice = (drink: "Pepsi" | "Coke" | "Orangina"): number | string | boolean =>
    when
      .true(drink === "Coke", 1.5)
      .true(drink === "Pepsi", true)
      .else("Free");

  it("should return value if matches an expression", () => {
    expect(getDrinkPrice("Coke")).toEqual(1.5);
    expect(getDrinkPrice("Pepsi")).toEqual(true);
  });

  it("should return default value if no match", () => {
    expect(getDrinkPrice("Orangina")).toEqual("Free");
  });
});

describe("'when.true' syntax with a function as `is` return value", () => {
  interface Action { type: string; }

  const apply = (action: Action) =>
    when
      .true(action.type === "INCREMENT", () => 2)
      .true(action.type === "DECREMENT", () => true)
      .else(() => null);

  it("should return value if matches an expression", () => {
    expect(apply({ type: "INCREMENT" })).toEqual(2);
    expect(apply({ type: "DECREMENT" })).toEqual(true);
  });

  it("should return default value if no match", () => {
    expect(apply({ type: "Hello" })).toBeNull();
    expect(apply({ type: "World" })).toBeNull();
  });
});

describe("'when.true' syntax with assertion wrapped in thunk", () => {
  const isBuffer = (obj: { isBuffer: () => boolean }) =>
    when
      .true(obj.isBuffer, 1)
      .else(2);

  it("should unwrap the thunk", () => {
    expect(isBuffer({ isBuffer: () => true })).toBe(1);
    expect(isBuffer({ isBuffer: () => false })).toBe(2);
  });
});

describe("'when.true' mixed with when(subject) syntax", () => {

  it("should allow to call all methods after method true()", () => {
    const whenTrue = (subject: any, bool: boolean) =>
      when(subject)
        .true(bool, true)
        .true(!bool, false);

    expect(whenTrue({}, true)).toHaveProperty("is");
    expect(whenTrue({}, true)).toHaveProperty("true");
    expect(whenTrue({}, true)).toHaveProperty("match");
  });

  it("should allow to call all methods after method is()", () => {
    const whenIs = (subject: string) =>
      when(subject)
        .is("some string", 42);

    expect(whenIs("some string")).toHaveProperty("is");
    expect(whenIs("some string")).toHaveProperty("true");
    expect(whenIs("some string")).toHaveProperty("match");
  });

  it("should allow to use assertion as function", () => {
    const whenWithFun = (subject: any, boolFun: () => boolean) =>
      when(subject)
        .true(boolFun, () => true)
        .else(() => false);

    expect(whenWithFun({}, () => true)).toEqual(true);
    expect(whenWithFun({}, () => false)).toEqual(false);
  });
});

describe("when.notNull()", () => {

  it("should return correct value when not wrapped in function", () => {
    const valueOrDefault = (value: any, defaultValue: any) =>
      when
        .notNull(value, (matched) => matched)
        .else(defaultValue);

    expect(valueOrDefault(null, "default")).toBe("default");
    expect(valueOrDefault("not null", "default")).toBe("not null");
  });

  it("should return correct value when wrapped in function", () => {
    const valueOrDefault = (value: any, defaultValue: any) =>
      when
        .notNull(value, (matched) => matched)
        .else(() => defaultValue);

    expect(valueOrDefault(null, "default")).toBe("default");
    expect(valueOrDefault("not null", "default")).toBe("not null");
  });

  it("should yield callback with non-nullable value", () => {
    const valueOrDefault = (value: string | null, defaultValue: number) =>
      when
        .notNull(value, (matched) => {
          StaticCheck<IsType<string, typeof matched>>();
          return matched;
        })
        .true(true, {key: "value"})
        .else(() => defaultValue);
  });
});
